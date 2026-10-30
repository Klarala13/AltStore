import { ConflictException, NotFoundException } from "@nestjs/common";
import type { PrismaService } from "../prisma/prisma.service";
import { AdminService } from "./admin.service";

/**
 * El panel de revision podia publicar una app cuyo APK no habia pasado el
 * escaneo. El boton de la cola ya se desactiva solo, pero eso solo tapa el
 * camino del navegador: el proxy del web y una llamada directa al API seguian
 * abiertos, y AGENTS.md pone esa regla entre las que no se saltan nunca.
 *
 * El freno vive ahora en el servicio. Esto lo sujeta ahi.
 */

interface Counts {
  approved: number;
  total: number;
}

function build(counts: Counts, appStatus = "PENDING_REVIEW") {
  const update = jest.fn().mockResolvedValue({ id: "app1", status: "ACTIVE" });
  const createLog = jest.fn();

  const count = jest.fn((args: { where: { status?: string } }) =>
    Promise.resolve(args.where.status === "APPROVED" ? counts.approved : counts.total)
  );

  const prisma = {
    app: {
      findUnique: jest.fn().mockResolvedValue({ id: "app1", status: appStatus }),
      update,
    },
    version: { count },
    securityLog: { create: createLog },
    $transaction: jest.fn((ops: unknown[]) => Promise.all(ops)),
  } as unknown as PrismaService;

  return { service: new AdminService(prisma), prisma, update, count };
}

describe("AdminService.updateAppStatus", () => {
  it("no publica si ninguna version paso el escaneo", async () => {
    const { service, update } = build({ approved: 0, total: 2 });

    await expect(service.updateAppStatus("app1", "ACTIVE", "admin1")).rejects.toThrow(
      ConflictException
    );
    expect(update).not.toHaveBeenCalled();
  });

  it("lo dice distinto cuando no hay ninguna version subida", async () => {
    const { service } = build({ approved: 0, total: 0 });

    await expect(service.updateAppStatus("app1", "ACTIVE", "admin1")).rejects.toThrow(
      /ninguna version subida/i
    );
  });

  it("publica cuando hay una version aprobada", async () => {
    const { service, update } = build({ approved: 1, total: 1 });

    await service.updateAppStatus("app1", "ACTIVE", "admin1");

    expect(update).toHaveBeenCalledWith({
      where: { id: "app1" },
      data: { status: "ACTIVE" },
    });
  });

  it("rechazar no pide escaneo: una app sospechosa hay que poder pararla ya", async () => {
    const { service, update, count } = build({ approved: 0, total: 1 });

    await service.updateAppStatus("app1", "SUSPENDED", "admin1");

    expect(update).toHaveBeenCalled();
    expect(count).not.toHaveBeenCalled();
  });

  it("sigue dando 404 si la app no existe", async () => {
    const { service, prisma } = build({ approved: 1, total: 1 });
    (prisma.app.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(service.updateAppStatus("nope", "ACTIVE", "admin1")).rejects.toThrow(
      NotFoundException
    );
  });
});
