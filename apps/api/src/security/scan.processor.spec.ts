import type { Job } from "bull";
import { ScanProcessor } from "./scan.processor";
import type { ScanJobData } from "./security.constants";
import type { VirusTotalService, VtAnalysis } from "./virustotal.service";
import type { StorageProvider } from "../storage/storage.provider";
import type { PrismaService } from "../prisma/prisma.service";

const CLEAN: VtAnalysis = {
  id: "sha-clean",
  stats: { malicious: 0, suspicious: 0, undetected: 60, harmless: 0 },
  status: "completed",
};
const INFECTED: VtAnalysis = {
  id: "sha-bad",
  stats: { malicious: 3, suspicious: 0, undetected: 57, harmless: 0 },
  status: "completed",
};

const setup = () => {
  const prisma = {
    version: { update: jest.fn().mockResolvedValue({}) },
    securityLog: { create: jest.fn().mockResolvedValue({}) },
  };
  const storage = {
    getSignedUrl: jest.fn().mockResolvedValue("https://storage/signed"),
    move: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };
  const virusTotal = {
    lookupHash: jest.fn(),
    scanBuffer: jest.fn(),
  };
  const processor = new ScanProcessor(
    prisma as unknown as PrismaService,
    storage as unknown as StorageProvider,
    virusTotal as unknown as VirusTotalService
  );
  return { prisma, storage, virusTotal, processor };
};

const job = (data: Partial<ScanJobData>, attemptsMade = 0, attempts = 3) =>
  ({
    data: { versionId: "v1", fileKey: "apps/com.x/1.0.0/x.apk", appBundleId: "com.x", ...data },
    attemptsMade,
    opts: { attempts },
  }) as unknown as Job<ScanJobData>;

const loggedActions = (prisma: ReturnType<typeof setup>["prisma"]) =>
  prisma.securityLog.create.mock.calls.map(([arg]) => arg.data.action);

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    arrayBuffer: async () => new ArrayBuffer(8),
  }) as unknown as typeof fetch;
});

describe("ScanProcessor — rescan", () => {
  it("uses the hash lookup and records the report without touching status", async () => {
    const { prisma, storage, virusTotal, processor } = setup();
    virusTotal.lookupHash.mockResolvedValue(CLEAN);

    await processor.handleScan(job({ mode: "rescan", fileSha256: "abc" }));

    expect(virusTotal.lookupHash).toHaveBeenCalledWith("abc");
    expect(virusTotal.scanBuffer).not.toHaveBeenCalled();
    expect(storage.move).not.toHaveBeenCalled();
    const { data } = prisma.version.update.mock.calls[0][0];
    expect(data.status).toBeUndefined();
    expect(data.virusTotalId).toBe("sha-clean");
    expect(data.scannedAt).toBeInstanceOf(Date);
    expect(loggedActions(prisma)).toContain("VIRUS_RESCAN_CLEAN");
  });

  it("uploads the file when VirusTotal does not know the hash", async () => {
    const { virusTotal, processor } = setup();
    virusTotal.lookupHash.mockResolvedValue(null);
    virusTotal.scanBuffer.mockResolvedValue(CLEAN);

    await processor.handleScan(job({ mode: "rescan", fileSha256: "abc" }));

    expect(virusTotal.scanBuffer).toHaveBeenCalledTimes(1);
  });

  it("blocks an infected live version but keeps its file for review", async () => {
    const { prisma, storage, virusTotal, processor } = setup();
    virusTotal.lookupHash.mockResolvedValue(INFECTED);

    await processor.handleScan(job({ mode: "rescan", fileSha256: "abc" }));

    expect(prisma.version.update.mock.calls[0][0].data.status).toBe("INFECTED");
    expect(storage.delete).not.toHaveBeenCalled();
    expect(loggedActions(prisma)).toContain("VIRUS_FOUND");
  });

  it("leaves a live version alone when the scan itself fails, even on the last attempt", async () => {
    const { prisma, virusTotal, processor } = setup();
    virusTotal.lookupHash.mockRejectedValue(new Error("VirusTotal is not configured"));

    await expect(
      processor.handleScan(job({ mode: "rescan", fileSha256: "abc" }, 2, 3))
    ).rejects.toThrow("not configured");

    expect(prisma.version.update).not.toHaveBeenCalled();
    expect(loggedActions(prisma)).toContain("VIRUS_SCAN_ERROR");
  });
});

describe("ScanProcessor — upload (unchanged behaviour)", () => {
  it("approves, moves and stamps scannedAt on a clean upload", async () => {
    const { prisma, storage, virusTotal, processor } = setup();
    virusTotal.scanBuffer.mockResolvedValue(CLEAN);

    await processor.handleScan(job({}));

    expect(virusTotal.lookupHash).not.toHaveBeenCalled();
    expect(storage.move).toHaveBeenCalledWith(
      "apps/com.x/1.0.0/x.apk",
      "apps/com.x/v1/app-release.apk"
    );
    const { data } = prisma.version.update.mock.calls[0][0];
    expect(data.status).toBe("APPROVED");
    expect(data.scannedAt).toBeInstanceOf(Date);
  });

  it("deletes an infected upload", async () => {
    const { prisma, storage, virusTotal, processor } = setup();
    virusTotal.scanBuffer.mockResolvedValue(INFECTED);

    await processor.handleScan(job({}));

    expect(storage.delete).toHaveBeenCalledWith("apps/com.x/1.0.0/x.apk");
    expect(prisma.version.update.mock.calls[0][0].data.status).toBe("INFECTED");
  });

  it("rejects an upload after the last failed attempt", async () => {
    const { prisma, virusTotal, processor } = setup();
    virusTotal.scanBuffer.mockRejectedValue(new Error("boom"));

    await expect(processor.handleScan(job({}, 2, 3))).rejects.toThrow("boom");

    expect(prisma.version.update.mock.calls[0][0].data.status).toBe("REJECTED");
  });
});
