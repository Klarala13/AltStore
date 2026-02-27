import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

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
  private readonly apiKey: string;
  private readonly baseUrl = "https://www.virustotal.com/api/v3";

  constructor(private readonly config: ConfigService) {
    this.apiKey = config.getOrThrow("VT_API_KEY");
  }

  /**
   * Submit a file buffer to VirusTotal and poll until the analysis completes.
   * Max polling duration: ~5 minutes (60 attempts × 5s intervals).
   */
  async scanBuffer(buffer: Buffer, filename: string): Promise<VtAnalysis> {
    const formData = new FormData();
    formData.append("file", new Blob([buffer]), filename);

    const uploadRes = await fetch(`${this.baseUrl}/files`, {
      method: "POST",
      headers: { "x-apikey": this.apiKey },
      body: formData,
    });

    if (!uploadRes.ok) {
      throw new Error(`VirusTotal upload failed: ${uploadRes.statusText}`);
    }

    const { data } = (await uploadRes.json()) as { data: { id: string } };
    this.logger.log(`VirusTotal analysis queued: ${data.id}`);

    return this.pollAnalysis(data.id);
  }

  private async pollAnalysis(
    analysisId: string,
    maxAttempts = 60,
    intervalMs = 5000
  ): Promise<VtAnalysis> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await this.sleep(intervalMs);

      const res = await fetch(`${this.baseUrl}/analyses/${analysisId}`, {
        headers: { "x-apikey": this.apiKey },
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
