-- CreateEnum
CREATE TYPE "DeveloperType" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- CreateEnum
CREATE TYPE "AppStatus" AS ENUM ('PENDING_REVIEW', 'ACTIVE', 'SUSPENDED', 'REMOVED');

-- CreateEnum
CREATE TYPE "VersionStatus" AS ENUM ('SCANNING', 'CLEAN', 'INFECTED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('ANDROID', 'IOS', 'BOTH');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('INFO', 'WARNING', 'ERROR', 'CRITICAL');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PRODUCTIVITY', 'SOCIAL', 'ENTERTAINMENT', 'TOOLS', 'EDUCATION', 'HEALTH', 'FINANCE', 'GAMES', 'PHOTOGRAPHY', 'NAVIGATION', 'OTHER');

-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DeveloperType" NOT NULL,
    "vatNumber" TEXT,
    "country" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bundleId" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "description" TEXT NOT NULL,
    "shortDesc" VARCHAR(200) NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "screenshots" TEXT[],
    "status" "AppStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "platform" "Platform" NOT NULL DEFAULT 'ANDROID',
    "minAndroid" TEXT,
    "minIos" TEXT,
    "websiteUrl" TEXT,
    "privacyUrl" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "totalDownloads" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "versionName" TEXT NOT NULL,
    "versionCode" INTEGER NOT NULL,
    "platform" "Platform" NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileSize" BIGINT NOT NULL,
    "fileSha256" TEXT NOT NULL,
    "changelog" TEXT NOT NULL,
    "minOs" TEXT NOT NULL,
    "status" "VersionStatus" NOT NULL DEFAULT 'SCANNING',
    "virusTotalId" TEXT,
    "virusTotalReport" JSONB,
    "scannedAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DownloadLog" (
    "id" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "userId" TEXT,
    "ipHash" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DownloadLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityLog" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "severity" "Severity" NOT NULL DEFAULT 'INFO',
    "metadata" JSONB,
    "performedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecurityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AppToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AppToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Developer_email_key" ON "Developer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "App_slug_key" ON "App"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "App_bundleId_key" ON "App"("bundleId");

-- CreateIndex
CREATE INDEX "App_category_status_idx" ON "App"("category", "status");

-- CreateIndex
CREATE INDEX "App_slug_idx" ON "App"("slug");

-- CreateIndex
CREATE INDEX "Version_appId_status_idx" ON "Version"("appId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Version_appId_versionName_platform_key" ON "Version"("appId", "versionName", "platform");

-- CreateIndex
CREATE INDEX "DownloadLog_versionId_createdAt_idx" ON "DownloadLog"("versionId", "createdAt");

-- CreateIndex
CREATE INDEX "SecurityLog_entityType_entityId_idx" ON "SecurityLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "SecurityLog_createdAt_severity_idx" ON "SecurityLog"("createdAt", "severity");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_AppToTag_B_index" ON "_AppToTag"("B");

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownloadLog" ADD CONSTRAINT "DownloadLog_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToTag" ADD CONSTRAINT "_AppToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToTag" ADD CONSTRAINT "_AppToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
