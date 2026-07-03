/// <reference path="./seed.node.d.ts" />

/**
 * Seed script — inserts TicTacToe80s as a ready-to-download fixture.
 *
 * Run from the repo root:
 *   pnpm --filter @altstore/db db:seed
 *
 * What it does:
 *   1. Upserts a demo Developer account (seed@altstore.dev / AltStore2026!)
 *   2. Upserts the TicTacToe80s App record (status ACTIVE)
 *   3. Upserts the v1.0.0 Version record with production-ready APK metadata
 *      (status APPROVED — skips VirusTotal for local testing)
 */

import { PrismaClient } from "../generated/client/index.js";
import * as crypto from "crypto";

const prisma = new PrismaClient();

const APK_FILE_KEY =
  process.env.SEED_APK_FILE_KEY ?? "apps/com.altstore.tictactoe80s/1.0.0/TicTacToe80s.apk";
const APP_ICON_URL = "/apps/tictactoe80s/icon.svg";
const APP_COVER_URL = "/apps/tictactoe80s/cover.svg";
const APK_SIZE_BYTES = BigInt(process.env.SEED_APK_FILE_SIZE ?? "60807176");
const APK_SHA256 =
  process.env.SEED_APK_SHA256 ?? "0c2abd632095dcf39209911deff44ee84278956edcae95da102645f5ad35e1c4";

const SNAKE_APK_FILE_KEY =
  process.env.SEED_SNAKE_APK_FILE_KEY ??
  "apps/com.altstore.snakearcade80s/1.0.0/SnakeArcade80s.apk";
const SNAKE_APP_ICON_URL = "/apps/snakearcade80s/icon.svg";
const SNAKE_APP_COVER_URL = "/apps/snakearcade80s/cover.svg";
const SNAKE_APK_SIZE_BYTES = BigInt(process.env.SEED_SNAKE_APK_FILE_SIZE ?? "19177809");
const SNAKE_APK_SHA256 =
  process.env.SEED_SNAKE_APK_SHA256 ??
  "a370d642eae4c7f6fada3cf308ba6789b936b4a358f6a5a46ae7d8358e0a136c";

async function main() {
  console.log("Seeding TicTacToe80s fixture…");
  console.log(`  APK fileKey: ${APK_FILE_KEY}`);

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
    update: {
      slug: "tictactoe80s",
      name: "TicTacToe 80s",
      category: "GAMES",
      description:
        "A retro 80s-styled Tic Tac Toe game built with React Native. Play against a friend on the same device with neon colours, chiptune sounds, and CRT scanline effects.",
      shortDesc: "Retro 80s neon Tic Tac Toe for two players.",
      iconUrl: APP_ICON_URL,
      screenshots: [APP_COVER_URL],
      platform: "ANDROID",
      privacyUrl: "https://altstore.dev/privacy",
      websiteUrl: "https://github.com/altstore/tictactoe80s",
      status: "ACTIVE",
    },
    create: {
      slug: "tictactoe80s",
      name: "TicTacToe 80s",
      bundleId: "com.altstore.tictactoe80s",
      developerId: developer.id,
      category: "GAMES",
      description:
        "A retro 80s-styled Tic Tac Toe game built with React Native. Play against a friend on the same device with neon colours, chiptune sounds, and CRT scanline effects.",
      shortDesc: "Retro 80s neon Tic Tac Toe for two players.",
      iconUrl: APP_ICON_URL,
      screenshots: [APP_COVER_URL],
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
    update: {
      fileKey: APK_FILE_KEY,
      fileSize: APK_SIZE_BYTES,
      fileSha256: APK_SHA256,
      status: "APPROVED",
      publishedAt: new Date(),
    },
    create: {
      appId: app.id,
      versionName: "1.0.0",
      versionCode: 1,
      platform: "ANDROID",
      fileKey: APK_FILE_KEY,
      fileSize: APK_SIZE_BYTES,
      fileSha256: APK_SHA256,
      changelog: "Initial release.",
      minOs: "Android 8.0",
      status: "APPROVED",
      publishedAt: new Date(),
    },
  });
  console.log(`  Version:   ${version.id} (${version.versionName}, ${version.status})`);

  // 4. Snake app
  const snakeApp = await prisma.app.upsert({
    where: { bundleId: "com.altstore.snakearcade80s" },
    update: {
      slug: "snakearcade80s",
      name: "Snake Arcade 80s",
      category: "GAMES",
      description:
        "Retro 80s-inspired Snake arcade game with neon visuals and fast-paced gameplay.",
      shortDesc: "Retro neon Snake arcade action.",
      iconUrl: SNAKE_APP_ICON_URL,
      screenshots: [SNAKE_APP_COVER_URL],
      platform: "ANDROID",
      privacyUrl: "https://altstore.dev/privacy",
      status: "ACTIVE",
    },
    create: {
      slug: "snakearcade80s",
      name: "Snake Arcade 80s",
      bundleId: "com.altstore.snakearcade80s",
      developerId: developer.id,
      category: "GAMES",
      description:
        "Retro 80s-inspired Snake arcade game with neon visuals and fast-paced gameplay.",
      shortDesc: "Retro neon Snake arcade action.",
      iconUrl: SNAKE_APP_ICON_URL,
      screenshots: [SNAKE_APP_COVER_URL],
      platform: "ANDROID",
      privacyUrl: "https://altstore.dev/privacy",
      status: "ACTIVE",
    },
  });
  console.log(`  Snake app: ${snakeApp.id} (${snakeApp.slug})`);

  // 5. Snake version
  const snakeVersion = await prisma.version.upsert({
    where: {
      appId_versionName_platform: {
        appId: snakeApp.id,
        versionName: "1.0.0",
        platform: "ANDROID",
      },
    },
    update: {
      fileKey: SNAKE_APK_FILE_KEY,
      fileSize: SNAKE_APK_SIZE_BYTES,
      fileSha256: SNAKE_APK_SHA256,
      status: "APPROVED",
      publishedAt: new Date(),
    },
    create: {
      appId: snakeApp.id,
      versionName: "1.0.0",
      versionCode: 1,
      platform: "ANDROID",
      fileKey: SNAKE_APK_FILE_KEY,
      fileSize: SNAKE_APK_SIZE_BYTES,
      fileSha256: SNAKE_APK_SHA256,
      changelog: "Initial release.",
      minOs: "Android 8.0",
      status: "APPROVED",
      publishedAt: new Date(),
    },
  });
  console.log(
    `  Snake ver: ${snakeVersion.id} (${snakeVersion.versionName}, ${snakeVersion.status})`
  );

  console.log("\nDone. Visit http://localhost:3002/apps/tictactoe80s to see it.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
