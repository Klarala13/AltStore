import type { ConfigService } from "@nestjs/config";
import type { PrismaService } from "../prisma/prisma.service";
import { RetentionProcessor } from "./retention.processor";
import { DELETE_BATCH_SIZE, MAX_BATCHES_PER_RUN } from "./retention.constants";

/**
 * This job deletes rows from production, so the loop that decides how many is
 * worth pinning down before it ever runs. Prisma is faked: these assert the
 * sweep's own arithmetic and stopping conditions, not the database.
 */

interface FakeDb {
  findMany: jest.Mock;
  deleteMany: jest.Mock;
  securityLog: jest.Mock;
}

function makePrisma(batches: number[]): FakeDb {
  let call = 0;
  const findMany = jest.fn(() => {
    const size = batches[call] ?? 0;
    call += 1;
    return Promise.resolve(Array.from({ length: size }, (_, i) => ({ id: `row-${call}-${i}` })));
  });
  const deleteMany = jest.fn((args: { where: { id: { in: string[] } } }) =>
    Promise.resolve({ count: args.where.id.in.length })
  );
  const securityLog = jest.fn(() => Promise.resolve({}));
  return { findMany, deleteMany, securityLog };
}

function build(db: FakeDb, days?: number) {
  const prisma = {
    downloadLog: { findMany: db.findMany, deleteMany: db.deleteMany },
    securityLog: { create: db.securityLog },
  } as unknown as PrismaService;

  const config = {
    get: (_key: string, fallback: number) => days ?? fallback,
  } as unknown as ConfigService;

  return new RetentionProcessor(prisma, config);
}

describe("RetentionProcessor.sweepDownloadLogs", () => {
  it("deletes everything older than the cutoff across several batches", async () => {
    // Two full batches then a partial one — the partial batch ends the sweep.
    const db = makePrisma([DELETE_BATCH_SIZE, DELETE_BATCH_SIZE, 7]);
    await build(db).sweepDownloadLogs();

    expect(db.deleteMany).toHaveBeenCalledTimes(3);
    const deleted = db.securityLog.mock.calls[0][0].data.metadata.deleted;
    expect(deleted).toBe(DELETE_BATCH_SIZE * 2 + 7);
  });

  it("stops immediately when there is nothing to delete", async () => {
    const db = makePrisma([0]);
    await build(db).sweepDownloadLogs();

    expect(db.findMany).toHaveBeenCalledTimes(1);
    expect(db.deleteMany).not.toHaveBeenCalled();
  });

  it("still records a run when it deleted nothing", async () => {
    // "Ran and found nothing" must not look like "never ran".
    const db = makePrisma([0]);
    await build(db).sweepDownloadLogs();

    expect(db.securityLog).toHaveBeenCalledTimes(1);
    const data = db.securityLog.mock.calls[0][0].data;
    expect(data.action).toBe("RETENTION_SWEEP");
    expect(data.metadata.deleted).toBe(0);
  });

  it("cuts off at the configured number of days", async () => {
    const db = makePrisma([0]);
    await build(db, 90).sweepDownloadLogs();

    const cutoff = new Date(db.findMany.mock.calls[0][0].where.createdAt.lt).getTime();
    const expected = Date.now() - 90 * 24 * 60 * 60 * 1000;
    // Generous window: the point is that it is ~90 days back, not milliseconds.
    expect(Math.abs(cutoff - expected)).toBeLessThan(60_000);
  });

  it("gives up rather than looping forever if rows never stop coming", async () => {
    // A filter that always matches would otherwise spin until the dyno dies.
    const db = makePrisma(Array(MAX_BATCHES_PER_RUN + 50).fill(DELETE_BATCH_SIZE));
    await build(db).sweepDownloadLogs();

    expect(db.deleteMany).toHaveBeenCalledTimes(MAX_BATCHES_PER_RUN);
  });
});
