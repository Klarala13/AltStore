import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe — enforces class-validator DTOs on all endpoints
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // CORS — restricted to Vercel frontend domain
  // An Origin header is serialised without a trailing slash, and CORS compares
  // it byte for byte, so "https://site.app/" never matches a request from
  // "https://site.app". That slash is easy to paste into a dashboard and the
  // failure it causes — blocked requests with no server-side error — looks
  // nothing like its cause. Normalise instead of trusting the panel.
  const frontendUrl = (process.env.FRONTEND_URL ?? "http://localhost:3000").replace(/\/+$/, "");

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
}

bootstrap();
