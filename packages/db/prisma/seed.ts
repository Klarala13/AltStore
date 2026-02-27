/**
 * Seed script — inserts TicTacToe80s as a ready-to-download fixture.
 *
 * Run from the repo root:
 *   pnpm --filter @altstore/db seed
 *
 * What it does:
 *   1. Upserts a demo Developer account (seed@altstore.dev / AltStore2026!)
 *   2. Upserts the TicTacToe80s App record (status ACTIVE)
 *   3. Upserts the v1.0.0 Version record pointing at the static public APK
 *      (status APPROVED — skips VirusTotal for local testing)
 */

import { PrismaClient } from "../generated/client/index.js";
import * as crypto from "crypto";

const prisma = new PrismaClient();

const APK_STATIC_URL = "/apks/TicTacToe80s.apk"; // served by Next.js public/
const APK_SIZE_BYTES = 60807176n; // 58.0 MB
const APK_SHA256 = "0c2abd632095dcf39209911deff44ee84278956edcae95da102645f5ad35e1c4";

async function main() {
  console.log("Seeding TicTacToe80s fixture…");

  // 1. Developer
  // Hash password with scrypt (Node built-in, no extra dependency)
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync("AltStore2026!", salt, 64).toString("hex");
  const passwordHash = `scrypt:${salt}:${derivedKey}`;
  const developer = await prisma.developer.upsert({
    where: { email: "seed@altstore.dev" },
    update: {},
    create: {
      email: "seed@altstore.dev",
      name: "AltStore Seed",
      passwordHash,
      type: "INDIVIDUAL",
      country: "EU",
      verified: true,
      verifiedAt: new Date(),
    },
  });
  console.log(`  Developer: ${developer.id} (${developer.email})`);

  // 2. App
  const app = await prisma.app.upsert({
    where: { bundleId: "com.altstore.tictactoe80s" },
    update: { status: "ACTIVE" },
    create: {
      slug: "tictactoe80s",
      name: "TicTacToe 80s",
      bundleId: "com.altstore.tictactoe80s",
      developerId: developer.id,
      category: "GAMES",
      description:
        "A retro 80s-styled Tic Tac Toe game built with React Native. Play against a friend on the same device with neon colours, chiptune sounds, and CRT scanline effects.",
      shortDesc: "Retro 80s neon Tic Tac Toe for two players.",
      iconUrl: "https://placehold.co/128x128/000000/1eff00?text=T3",
      screenshots: [],
      platform: "ANDROID",
      privacyUrl: "https://altstore.dev/privacy",
      websiteUrl: "https://github.com/altstore/tictactoe80s",
      status: "ACTIVE",
    },
  });
  console.log(`  App:       ${app.id} (${app.slug})`);

  // 3. Version
  const version = await prisma.version.upsert({
    where: {
      appId_versionName_platform: {
        appId: app.id,
        versionName: "1.0.0",
        platform: "ANDROID",
      },
    },
    update: { status: "APPROVED" },
    create: {
      appId: app.id,
      versionName: "1.0.0",
      versionCode: 1,
      platform: "ANDROID",
      fileKey: APK_STATIC_URL,
      fileSize: APK_SIZE_BYTES,
      fileSha256: APK_SHA256,
      changelog: "Initial release.",
      minOs: "Android 8.0",
      status: "APPROVED",
      publishedAt: new Date(),
    },
  });
  console.log(`  Version:   ${version.id} (${version.versionName}, ${version.status})`);

  console.log("\nDone. Visit http://localhost:3002/apps/tictactoe80s to see it.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
