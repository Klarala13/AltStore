import type { ConfigService } from "@nestjs/config";
import { VirusTotalService } from "./virustotal.service";

const config = (key?: string) => ({ get: () => key }) as unknown as ConfigService;

const json = (status: number, body: unknown) => ({
  ok: status >= 200 && status < 300,
  status,
  statusText: String(status),
  json: async () => body,
});

const STATS = { malicious: 0, suspicious: 0, undetected: 70, harmless: 0 };

describe("VirusTotalService", () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
    // Skip the 15s polling waits.
    jest
      .spyOn(VirusTotalService.prototype as unknown as { sleep: () => Promise<void> }, "sleep")
      .mockResolvedValue(undefined);
  });

  it("reports whether an API key is set", () => {
    expect(new VirusTotalService(config("k")).isConfigured()).toBe(true);
    expect(new VirusTotalService(config()).isConfigured()).toBe(false);
  });

  it("returns null for a hash VirusTotal has never seen", async () => {
    fetchMock.mockResolvedValue(json(404, {}));
    await expect(new VirusTotalService(config("k")).lookupHash("abc")).resolves.toBeNull();
  });

  it("returns the last analysis for a known hash", async () => {
    fetchMock.mockResolvedValue(json(200, { data: { attributes: { last_analysis_stats: STATS } } }));
    await expect(new VirusTotalService(config("k")).lookupHash("abc")).resolves.toEqual({
      id: "abc",
      stats: STATS,
      status: "completed",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.virustotal.com/api/v3/files/abc",
      expect.anything()
    );
  });

  it("throws on other lookup errors instead of treating them as unknown", async () => {
    fetchMock.mockResolvedValue(json(429, {}));
    await expect(new VirusTotalService(config("k")).lookupHash("abc")).rejects.toThrow("429");
  });

  it("asks for an upload URL for files over 32 MB", async () => {
    fetchMock
      .mockResolvedValueOnce(json(200, { data: "https://upload.virustotal.com/big" }))
      .mockResolvedValueOnce(json(200, { data: { id: "an-1" } }))
      .mockResolvedValueOnce(json(200, { data: { id: "an-1", attributes: { status: "completed", stats: STATS } } }));

    const big = Buffer.alloc(33 * 1024 * 1024);
    await new VirusTotalService(config("k")).scanBuffer(big, "big.apk");

    expect(fetchMock.mock.calls[0][0]).toBe("https://www.virustotal.com/api/v3/files/upload_url");
    expect(fetchMock.mock.calls[1][0]).toBe("https://upload.virustotal.com/big");
  });

  it("posts small files straight to /files", async () => {
    fetchMock
      .mockResolvedValueOnce(json(200, { data: { id: "an-2" } }))
      .mockResolvedValueOnce(json(200, { data: { id: "an-2", attributes: { status: "completed", stats: STATS } } }));

    await new VirusTotalService(config("k")).scanBuffer(Buffer.alloc(10), "small.apk");

    expect(fetchMock.mock.calls[0][0]).toBe("https://www.virustotal.com/api/v3/files");
  });
});
