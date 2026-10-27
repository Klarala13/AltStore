import { Test } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { getQueueToken } from "@nestjs/bull";
import { VersionsService } from "./versions.service";
import { VersionsModule } from "./versions.module";
import { SCAN_QUEUE } from "../security/security.constants";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaModule } from "../prisma/prisma.module";

/**
 * Prueba de arranque, no de logica.
 *
 * `VersionsService` paso a pedir `JwtService` por el constructor. Eso compila
 * sin quejarse: Nest resuelve las dependencias al arrancar, no al compilar. Si
 * el modulo no importa quien exporta `JwtModule`, `tsc` y `nest build` pasan en
 * verde y el contenedor muere al levantar.
 *
 * Este proyecto ya perdio dos semanas con builds verdes que no arrancaban. Un
 * test que monte el grafo de dependencias cuesta segundos y cierra esa puerta.
 */
describe("VersionsModule", () => {
  it("resuelve VersionsService con todas sus dependencias", async () => {
    process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

    const moduleRef = await Test.createTestingModule({
      // PrismaModule es global en la app real, de ahi lo saca AuthService.
      imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, VersionsModule],
    })
      // La base de datos y Redis no pintan nada aqui: lo que se comprueba es que
      // el grafo se resuelve, no que haya infraestructura.
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(getQueueToken(SCAN_QUEUE))
      .useValue({ add: jest.fn() })
      .compile();

    expect(moduleRef.get(VersionsService)).toBeInstanceOf(VersionsService);
  });
});
