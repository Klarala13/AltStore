import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// Above this size VirusTotal rejects POST /files and wants a one-off upload URL instead.
const DIRECT_UPLOAD_LIMIT_BYTES = 32 * 1024 * 1024;

export interface VtAnalysis {
  id: string;
  stats: {
    malicious: number;
    suspicious: number;
    undetected: number;
    harmless: number;
  };
  status: "completed" | "queued" | "in-progress";
}

@Injectable()
export class VirusTotalService {
  private readonly logger = new Logger(VirusTotalService.name);
  private readonly apiKey?: string;
  private readonly baseUrl = "https://www.virustotal.com/api/v3";

  constructor(private readonly config: ConfigService) {
    this.apiKey = config.get<string>("VT_API_KEY");
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey);
  }

  private getApiKey(): string {
    if (!this.apiKey) {
      throw new ServiceUnavailableException(
        "VirusTotal is not configured. Set VT_API_KEY to enable malware scanning."
      );
    }

    return this.apiKey;
  }

  /**
   * Looks up an existing report by SHA-256. One request and no upload, so it is
   * the cheap path for files VirusTotal has already seen. Returns null when the
   * hash is unknown (or known but not analysed yet).
   */
  async lookupHash(sha256: string): Promise<VtAnalysis | null> {
    const res = await fetch(`${this.baseUrl}/files/${sha256}`, {
      headers: { "x-apikey": this.getApiKey() },
    });

    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`VirusTotal hash lookup failed: ${res.status} ${res.statusText}`);
    }

    const { data } = (await res.json()) as {
      data: { attributes: { last_analysis_stats?: VtAnalysis["stats"] } };
    };
    const stats = data.attributes.last_analysis_stats;
    if (!stats) return null;

    return { id: sha256, stats, status: "completed" };
  }

  /**
   * Submit a file buffer to VirusTotal and poll until the analysis completes.
   * Max polling duration: ~10 minutes (40 attempts × 15s intervals).
   */
  async scanBuffer(buffer: Buffer, filename: string): Promise<VtAnalysis> {
    const apiKey = this.getApiKey();
    const formData = new FormData();
    formData.append("file", new Blob([buffer]), filename);

    const uploadUrl =
      buffer.length > DIRECT_UPLOAD_LIMIT_BYTES
        ? await this.getLargeFileUploadUrl()
        : `${this.baseUrl}/files`;

    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: { "x-apikey": apiKey },
      body: formData,
    });

    if (!uploadRes.ok) {
      throw new Error(`VirusTotal upload failed: ${uploadRes.status} ${uploadRes.statusText}`);
    }

    const { data } = (await uploadRes.json()) as { data: { id: string } };
    this.logger.log(`VirusTotal analysis queued: ${data.id}`);

    return this.pollAnalysis(data.id);
  }

  private async getLargeFileUploadUrl(): Promise<string> {
    const res = await fetch(`${this.baseUrl}/files/upload_url`, {
      headers: { "x-apikey": this.getApiKey() },
    });
    if (!res.ok) {
      throw new Error(`VirusTotal upload_url failed: ${res.status} ${res.statusText}`);
    }
    const { data } = (await res.json()) as { data: string };
    return data;
  }

  // 15s keeps polling inside the public API quota (4 requests/minute); at 5s
  // most polls came back 429 and were silently skipped.
  private async pollAnalysis(
    analysisId: string,
    maxAttempts = 40,
    intervalMs = 15000
  ): Promise<VtAnalysis> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await this.sleep(intervalMs);

      const res = await fetch(`${this.baseUrl}/analyses/${analysisId}`, {
        headers: { "x-apikey": this.getApiKey() },
      });

      if (!res.ok) {
        this.logger.warn(`VT poll attempt ${attempt + 1} failed`);
        continue;
      }

      const { data } = (await res.json()) as {
        data: {
          attributes: {
            status: string;
            stats: VtAnalysis["stats"];
          };
          id: string;
        };
      };

      if (data.attributes.status === "completed") {
        return {
          id: analysisId,
          stats: data.attributes.stats,
          status: "completed",
        };
      }

      this.logger.debug(`VT scan in progress (attempt ${attempt + 1})`);
    }

    throw new Error(`VirusTotal analysis ${analysisId} did not complete within timeout`);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
