import { BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ImagesService } from "./images.service";
import { PrismaService } from "../prisma/prisma.service";
import { StorageProvider } from "../storage/storage.provider";
import { MAX_ICON_BYTES, MAX_SCREENSHOTS } from "./images.constants";

const APP_ID = "app1";
const DEV_ID = "dev1";

const PNG_PREFIX = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
const NOT_AN_IMAGE = Buffer.from("<html>hello</html>".padEnd(12, " "));

function setup(app: Partial<{ iconUrl: string; screenshots: string[] }> = {}) {
  const prisma = {
    app: {
      findUnique: jest.fn().mockResolvedValue({
        id: APP_ID,
        developerId: DEV_ID,
        iconUrl: app.iconUrl ?? "/icon.svg",
        screenshots: app.screenshots ?? [],
      }),
      update: jest.fn().mockResolvedValue({}),
    },
  } as unknown as PrismaService;

  const storage = {
    getSignedUploadUrl: jest.fn().mockResolvedValue("https://r2.example/put"),
    getSignedUrl: jest.fn().mockResolvedValue("https://r2.example/get"),
    head: jest.fn().mockResolvedValue({ size: 1234 }),
    readPrefix: jest.fn().mockResolvedValue(PNG_PREFIX),
    delete: jest.fn().mockResolvedValue(undefined),
  } as unknown as StorageProvider;

  const jwt = new JwtService({ secret: "test-secret" });
  return { service: new ImagesService(prisma, storage, jwt), prisma, storage, jwt };
}

async function refFor(
  jwt: JwtService,
  over: Partial<{ appId: string; fileKey: string; kind: string; contentType: string }> = {}
) {
  return jwt.signAsync({
    appId: APP_ID,
    fileKey: `images/${APP_ID}/11111111-1111-4111-8111-111111111111.png`,
    kind: "icon",
    contentType: "image/png",
    purpose: "image-upload",
    ...over,
  });
}

describe("ImagesService", () => {
  describe("createUploadUrl", () => {
    it("firma una clave dentro de la carpeta de la app", async () => {
      const { service, storage } = setup();
      const out = await service.createUploadUrl(APP_ID, DEV_ID, {
        kind: "icon",
        contentType: "image/png",
      });

      const [key, , contentType] = (storage.getSignedUploadUrl as jest.Mock).mock.calls[0];
      expect(key).toMatch(new RegExp(`^images/${APP_ID}/[0-9a-f-]{36}\\.png$`));
      expect(contentType).toBe("image/png");
      expect(out.uploadRef).toEqual(expect.any(String));
    });

    it("no deja pasar de las capturas permitidas", async () => {
      const { service } = setup({ screenshots: new Array(MAX_SCREENSHOTS).fill("/api/images/x") });
      await expect(
        service.createUploadUrl(APP_ID, DEV_ID, { kind: "screenshot", contentType: "image/png" })
      ).rejects.toThrow(BadRequestException);
    });

    it("rechaza a quien no es dueno de la app", async () => {
      const { service } = setup();
      await expect(
        service.createUploadUrl(APP_ID, "otro", { kind: "icon", contentType: "image/png" })
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe("completeUpload", () => {
    it("guarda el icono como ruta relativa", async () => {
      const { service, prisma, jwt } = setup();
      const out = await service.completeUpload(APP_ID, DEV_ID, {
        uploadRef: await refFor(jwt),
      });

      expect(out.url).toBe("/api/images/app1/11111111-1111-4111-8111-111111111111.png");
      expect((prisma.app.update as jest.Mock).mock.calls[0][0].data).toEqual({
        iconUrl: out.url,
      });
    });

    it("anade la captura a la lista en vez de reemplazarla", async () => {
      const { service, prisma, jwt } = setup({ screenshots: ["/api/images/app1/old.png"] });
      const out = await service.completeUpload(APP_ID, DEV_ID, {
        uploadRef: await refFor(jwt, { kind: "screenshot" }),
      });

      expect((prisma.app.update as jest.Mock).mock.calls[0][0].data).toEqual({
        screenshots: { push: out.url },
      });
    });

    it("borra el objeto y falla si los bytes no son los del tipo declarado", async () => {
      const { service, storage, prisma, jwt } = setup();
      (storage.readPrefix as jest.Mock).mockResolvedValue(NOT_AN_IMAGE);

      await expect(
        service.completeUpload(APP_ID, DEV_ID, { uploadRef: await refFor(jwt) })
      ).rejects.toThrow(BadRequestException);

      expect(storage.delete).toHaveBeenCalled();
      expect(prisma.app.update).not.toHaveBeenCalled();
    });

    it("borra el objeto y falla si pasa del tamano permitido", async () => {
      const { service, storage, jwt } = setup();
      (storage.head as jest.Mock).mockResolvedValue({ size: MAX_ICON_BYTES + 1 });

      await expect(
        service.completeUpload(APP_ID, DEV_ID, { uploadRef: await refFor(jwt) })
      ).rejects.toThrow(BadRequestException);
      expect(storage.delete).toHaveBeenCalled();
    });

    it("falla si no se subio nada a la URL firmada", async () => {
      const { service, storage, jwt } = setup();
      (storage.head as jest.Mock).mockResolvedValue(null);

      await expect(
        service.completeUpload(APP_ID, DEV_ID, { uploadRef: await refFor(jwt) })
      ).rejects.toThrow(BadRequestException);
    });

    it("rechaza un uploadRef firmado para otra app", async () => {
      const { service, jwt } = setup();
      await expect(
        service.completeUpload(APP_ID, DEV_ID, { uploadRef: await refFor(jwt, { appId: "otra" }) })
      ).rejects.toThrow(ForbiddenException);
    });

    it("borra el icono anterior solo si lo habiamos subido nosotros", async () => {
      const previo = "/api/images/app1/22222222-2222-4222-8222-222222222222.png";
      const { service, storage, jwt } = setup({ iconUrl: previo });
      await service.completeUpload(APP_ID, DEV_ID, { uploadRef: await refFor(jwt) });
      expect(storage.delete).toHaveBeenCalledWith(`images/${previo.slice("/api/images/".length)}`);

      const { service: s2, storage: st2, jwt: j2 } = setup({ iconUrl: "/icon.svg" });
      await s2.completeUpload(APP_ID, DEV_ID, { uploadRef: await refFor(j2) });
      expect(st2.delete).not.toHaveBeenCalled();
    });
  });

  describe("resolveSignedUrl", () => {
    it("sirve una clave con la forma esperada", async () => {
      const { service, storage } = setup();
      const out = await service.resolveSignedUrl("app1/11111111-1111-4111-8111-111111111111.png");
      expect(out.url).toBe("https://r2.example/get");
      expect(storage.getSignedUrl).toHaveBeenCalledWith(
        "images/app1/11111111-1111-4111-8111-111111111111.png",
        expect.any(Number)
      );
    });

    // Sin el filtro, esta ruta serviria para pedir cualquier objeto del bucket,
    // incluidos los APK en cuarentena esperando el escaneo.
    it.each([
      "../uploads/pending/secret.apk",
      "app1/../../uploads/pending/secret.apk",
      "apps/com.appia.foco/1.0.0/Foco.apk",
      "app1/no-es-un-uuid.png",
      "app1/11111111-1111-4111-8111-111111111111.svg",
    ])("no sirve %s", async (path) => {
      const { service, storage } = setup();
      await expect(service.resolveSignedUrl(path)).rejects.toThrow(NotFoundException);
      expect(storage.getSignedUrl).not.toHaveBeenCalled();
    });

    it("da 404 si el objeto no existe", async () => {
      const { service, storage } = setup();
      (storage.head as jest.Mock).mockResolvedValue(null);
      await expect(
        service.resolveSignedUrl("app1/11111111-1111-4111-8111-111111111111.png")
      ).rejects.toThrow(NotFoundException);
    });
  });
});
