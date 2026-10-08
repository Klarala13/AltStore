import { ServiceUnavailableException } from "@nestjs/common";
import type { Queue } from "bull";
import { RescanService } from "./rescan.service";
import type { ScanJobData } from "./security.constants";
import type { VirusTotalService } from "./virustotal.service";
import type { PrismaService } from "../prisma/prisma.service";

const VERSIONS = [
  { id: "v1", fileKey: "k1", fileSha256: "s1", app: { bundleId: "com.a" } },
  { id: "v2", fileKey: "k2", fileSha256: "s2", app: { bundleId: "com.b" } },
];

const setup = (configured = true) => {
  const prisma = {
    version: { findMany: jest.fn().mockResolvedValue(VERSIONS) },
    securityLog: { create: jest.fn().mockResolvedValue({}) },
  };
  const queue = { add: jest.fn().mockResolvedValue({}) };
  const virusTotal = { isConfigured: () => configured };
  const service = new RescanService(
    prisma as unknown as PrismaService,
    virusTotal as unknown as VirusTotalService,
    queue as unknown as Queue<ScanJobData>
  );
  return { prisma, queue, service };
};

describe("RescanService", () => {
  it("refuses to queue anything when VirusTotal is not configured", async () => {
    const { prisma, queue, service } = setup(false);
    await expect(service.queueApprovedVersions(false, "admin")).rejects.toBeInstanceOf(
      ServiceUnavailableException
    );
    expect(prisma.version.findMany).not.toHaveBeenCalled();
    expect(queue.add).not.toHaveBeenCalled();
  });

  it("by default targets approved versions that were never scanned", async () => {
    const { prisma, service } = setup();
    await service.queueApprovedVersions(false, "admin");
    expect(prisma.version.findMany.mock.calls[0][0].where).toEqual({
      status: "APPROVED",
      virusTotalId: null,
    });
  });

  it("targets every approved version when all is set", async () => {
    const { prisma, service } = setup();
    await service.queueApprovedVersions(true, "admin");
    expect(prisma.version.findMany.mock.calls[0][0].where).toEqual({ status: "APPROVED" });
  });

  it("queues staggered, de-duplicated rescan jobs and logs who asked", async () => {
    const { prisma, queue, service } = setup();
    const result = await service.queueApprovedVersions(false, "admin-1");

    expect(result).toEqual({ queued: 2, versionIds: ["v1", "v2"] });
    const [[data1, opts1], [, opts2]] = queue.add.mock.calls;
    expect(data1).toEqual({
      versionId: "v1",
      fileKey: "k1",
      appBundleId: "com.a",
      fileSha256: "s1",
      mode: "rescan",
    });
    expect(opts1.jobId).toBe("rescan:v1");
    expect(opts2.delay).toBeGreaterThan(opts1.delay);
    expect(prisma.securityLog.create.mock.calls[0][0].data.performedBy).toBe("admin-1");
  });
});
