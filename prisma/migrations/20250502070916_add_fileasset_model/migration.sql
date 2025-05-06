/*
  Warnings:

  - You are about to drop the `FileAsset` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FileAsset";

-- CreateTable
CREATE TABLE "fileasset" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "data" BYTEA NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fileasset_pkey" PRIMARY KEY ("id")
);
