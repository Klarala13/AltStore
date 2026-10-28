import { Test } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { ImagesService } from "./images.service";
import { ImagesModule } from "./images.module";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaModule } from "../prisma/prisma.module";

/**
 * Prueba de arranque, no de logica. Mismo motivo que `versions.module.spec.ts`:
 * `ImagesService` pide `JwtService` por el constructor, y si el modulo no
 * importa quien exporta `JwtModule`, `tsc` y `nest build` pasan en verde y el
 * contenedor muere al levantar. Nest resuelve el grafo al arrancar, no al
 * compilar.
 */
describe("ImagesModule", () => {
  it("resuelve ImagesService con todas sus dependencias", async () => {
    process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ImagesModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    expect(moduleRef.get(ImagesService)).toBeInstanceOf(ImagesService);
  });
});
