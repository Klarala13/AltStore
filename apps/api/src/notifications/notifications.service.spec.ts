import { ConfigService } from "@nestjs/config";
import { NotificationsService, SubmissionNotice } from "./notifications.service";

const NOTICE: SubmissionNotice = {
  appName: "Foco",
  slug: "foco",
  bundleId: "com.appia.foco",
  category: "PRODUCTIVITY",
  versionName: "1.0.0",
  fileSizeBytes: 851667,
};

function build(env: Record<string, string | undefined>) {
  const config = { get: (key: string) => env[key] } as unknown as ConfigService;
  return new NotificationsService(config);
}

const CONFIGURED = {
  RESEND_API_KEY: "re_test_key",
  NOTIFY_EMAIL_TO: "clara@example.com",
  FRONTEND_URL: "https://appia-nu.vercel.app/",
};

describe("NotificationsService", () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn().mockResolvedValue({ ok: true, status: 200, statusText: "OK" });
    global.fetch = fetchMock as unknown as typeof fetch;
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  it("no llama al proveedor si falta la clave", async () => {
    await build({ NOTIFY_EMAIL_TO: "clara@example.com" }).notifyNewSubmission(NOTICE);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("no llama al proveedor si falta el destinatario", async () => {
    await build({ RESEND_API_KEY: "re_test_key" }).notifyNewSubmission(NOTICE);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("envia la app, la version y el enlace al panel", async () => {
    await build(CONFIGURED).notifyNewSubmission(NOTICE);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test_key");

    const body = JSON.parse(init.body);
    expect(body.to).toEqual(["clara@example.com"]);
    expect(body.subject).toContain("Foco");
    expect(body.text).toContain("com.appia.foco");
    expect(body.text).toContain("v1.0.0");
    expect(body.text).toContain("832 KB");
    // La barra final de FRONTEND_URL no puede colarse como "//admin".
    expect(body.text).toContain("https://appia-nu.vercel.app/admin");
  });

  it("no mete ningun dato del desarrollador en el correo", async () => {
    await build(CONFIGURED).notifyNewSubmission(NOTICE);

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    // El unico email del mensaje es el destinatario y el remitente. Si alguien
    // anade el del que sube, este test se cae.
    const emails: string[] = body.text.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? [];
    expect(emails).toEqual([]);
  });

  it("no lanza si el proveedor responde mal", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 422, statusText: "Unprocessable" });
    await expect(build(CONFIGURED).notifyNewSubmission(NOTICE)).resolves.toBeUndefined();
  });

  it("no lanza si la peticion falla o caduca", async () => {
    fetchMock.mockRejectedValue(new Error("timed out"));
    await expect(build(CONFIGURED).notifyNewSubmission(NOTICE)).resolves.toBeUndefined();
  });
});
