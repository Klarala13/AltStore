import { ConflictException } from "@nestjs/common";
import type { PrismaService } from "../prisma/prisma.service";
import type { CreateAppDto } from "./apps.dto";
import { AppsService } from "./apps.service";

/**
 * Un alta repetida devolvia `500 Internal server error` en produccion: Prisma
 * lanzaba su P2002 por el `slug` unico y no lo recogia nadie. El usuario leia
 * un fallo del servidor cuando el problema era que el nombre estaba cogido.
 *
 * Se prueba aqui y no contra produccion por una razon concreta: el endpoint de
 * envio tiene un limite de 5 por hora y por IP, asi que comprobarlo a base de
 * peticiones gasta el limite — es exactamente lo que me paso al intentarlo.
 */

/** Imita el error que lanza Prisma; se detecta por forma, no por clase. */
function prismaUniqueError(target: string[]) {
  return Object.assign(new Error("Unique constraint failed"), {
    code: "P2002",
    meta: { target },
  });
}

const DTO = {
  name: "Klara",
  slug: "klara",
  bundleId: "123",
  category: "TOOLS",
  description: "d",
  shortDesc: "s",
  iconUrl: "/icon.svg",
  privacyUrl: "https://appia-nu.vercel.app/privacy",
} as unknown as CreateAppDto;

function build(create: jest.Mock) {
  return new AppsService({ app: { create } } as unknown as PrismaService);
}

describe("AppsService.create", () => {
  it("devuelve la app cuando no hay choque", async () => {
    const created = { id: "app_1", slug: "klara" };
    const service = build(jest.fn().mockResolvedValue(created));

    await expect(service.create("dev_1", DTO)).resolves.toBe(created);
  });

  it("convierte un slug repetido en 409 y dice que cambie el nombre", async () => {
    const service = build(jest.fn().mockRejectedValue(prismaUniqueError(["slug"])));

    await expect(service.create("dev_1", DTO)).rejects.toBeInstanceOf(ConflictException);
    await expect(service.create("dev_1", DTO)).rejects.toThrow(/already exists/i);
    // El mensaje nombra la app, para que se sepa que cambiar.
    await expect(service.create("dev_1", DTO)).rejects.toThrow(/Klara/);
  });

  it("distingue el bundleId del slug", async () => {
    const service = build(jest.fn().mockRejectedValue(prismaUniqueError(["bundleId"])));

    await expect(service.create("dev_1", DTO)).rejects.toThrow(/bundle ID/i);
    await expect(service.create("dev_1", DTO)).rejects.toThrow(/123/);
  });

  it("no se traga un error que no sea de restriccion unica", async () => {
    // Enmascarar un fallo real de base de datos como 409 seria peor que el 500.
    const boom = new Error("connection reset");
    const service = build(jest.fn().mockRejectedValue(boom));

    await expect(service.create("dev_1", DTO)).rejects.toBe(boom);
  });
});
