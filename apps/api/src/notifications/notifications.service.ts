import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * Lo que viaja en el aviso. Deliberadamente NO lleva nada del desarrollador:
 * ni su email, ni su nombre, ni su id.
 *
 * Decision de Clara (2026-10-28): el correo solo identifica la app y enlaza al
 * panel. Quien la sube se mira alli dentro. Asi ningun dato personal sale hacia
 * el proveedor de correo, y /privacy no tiene que contar un tratamiento nuevo.
 * Si algun dia se anade un campo con datos del que sube, hay que revisar esa
 * pagina antes (AGENTS.md: los cambios de RGPD se preguntan).
 */
export interface SubmissionNotice {
  appName: string;
  slug: string;
  bundleId: string;
  category: string;
  versionName: string;
  fileSizeBytes: number;
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/**
 * Remitente por defecto. `onboarding@resend.dev` es el que Resend presta a las
 * cuentas sin dominio propio, y solo entrega al email de la propia cuenta: vale
 * exactamente para este caso (avisarse a uno mismo). Con dominio propio, se
 * cambia por NOTIFY_EMAIL_FROM y deja de tener esa limitacion.
 */
const DEFAULT_FROM = "Appia <onboarding@resend.dev>";

/** Un proveedor caido no puede retrasar una subida. */
const TIMEOUT_MS = 8000;

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly apiKey?: string;
  private readonly to?: string;
  private readonly from: string;
  private readonly adminUrl: string;
  private missingConfigLogged = false;

  constructor(config: ConfigService) {
    this.apiKey = config.get<string>("RESEND_API_KEY");
    this.to = config.get<string>("NOTIFY_EMAIL_TO");
    this.from = config.get<string>("NOTIFY_EMAIL_FROM") ?? DEFAULT_FROM;

    const site = (config.get<string>("FRONTEND_URL") ?? "").replace(/\/+$/, "");
    this.adminUrl = `${site}/admin`;
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.to);
  }

  /**
   * Avisa de que hay una app nueva esperando revision.
   *
   * No lanza nunca, pase lo que pase. Quien la llama ya ha guardado la version
   * y encolado el escaneo: si el correo falla, la subida siguio bien y lo unico
   * que se pierde es el aviso. Hacerla fallar aqui convertiria un problema del
   * proveedor de correo en un error de cara al que sube la app.
   */
  async notifyNewSubmission(notice: SubmissionNotice): Promise<void> {
    if (!this.isConfigured()) {
      if (!this.missingConfigLogged) {
        this.missingConfigLogged = true;
        this.logger.warn("Sin RESEND_API_KEY o NOTIFY_EMAIL_TO: no se avisa de las apps nuevas.");
      }
      return;
    }

    try {
      const res = await fetch(RESEND_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: this.from,
          to: [this.to],
          subject: `Appia · nueva app para revisar: ${notice.appName}`,
          text: this.buildBody(notice),
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (!res.ok) {
        this.logger.warn(
          `No se pudo enviar el aviso de ${notice.slug}: ${res.status} ${res.statusText}`
        );
        return;
      }

      this.logger.log(`Aviso enviado: ${notice.slug}`);
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      this.logger.warn(`No se pudo enviar el aviso de ${notice.slug}: ${reason}`);
    }
  }

  private buildBody(notice: SubmissionNotice): string {
    return [
      notice.appName,
      `${notice.bundleId} · ${notice.category}`,
      `v${notice.versionName} · ${formatSize(notice.fileSizeBytes)}`,
      "",
      `Revisar → ${this.adminUrl}`,
      "",
      "Quien la sube aparece en el panel.",
    ].join("\n");
  }
}

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}
