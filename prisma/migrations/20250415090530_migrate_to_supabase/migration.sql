-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "account" (
    "id" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "type" VARCHAR(191) NOT NULL,
    "provider" VARCHAR(191) NOT NULL,
    "providerAccountId" VARCHAR(191) NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" VARCHAR(191),
    "scope" VARCHAR(191),
    "id_token" TEXT,
    "session_state" VARCHAR(191),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alat" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama_alat" VARCHAR(255) NOT NULL,
    "status" VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    "alat_id" SERIAL NOT NULL,
    "jumlah_alat" VARCHAR(255) NOT NULL,

    CONSTRAINT "alat_pkey" PRIMARY KEY ("alat_id")
);

-- CreateTable
CREATE TABLE "authenticator" (
    "credentialID" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "providerAccountId" VARCHAR(191) NOT NULL,
    "credentialPublicKey" VARCHAR(191) NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" VARCHAR(191) NOT NULL,
    "credentialBackedUp" SMALLINT NOT NULL,
    "transports" VARCHAR(191),

    CONSTRAINT "authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "bahan" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama_bahan" VARCHAR(255) NOT NULL,
    "tipe_bahan" VARCHAR(255) NOT NULL,
    "status" VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    "bahan_id" SERIAL NOT NULL,

    CONSTRAINT "bahan_pkey" PRIMARY KEY ("bahan_id")
);

-- CreateTable
CREATE TABLE "barang" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama_barang" VARCHAR(255) NOT NULL,
    "merk_barang" VARCHAR(255) NOT NULL,
    "tipe_barang" VARCHAR(255) NOT NULL,
    "barang_id" SERIAL NOT NULL,
    "jumlah_barang" VARCHAR(255) NOT NULL,

    CONSTRAINT "barang_pkey" PRIMARY KEY ("barang_id")
);

-- CreateTable
CREATE TABLE "instrumen" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama_instrumen" VARCHAR(255) NOT NULL,
    "merk_instrumen" VARCHAR(255) NOT NULL,
    "tipe_instrumen" VARCHAR(255) NOT NULL,
    "layanan" VARCHAR(255) NOT NULL,
    "status" VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    "image_url" VARCHAR(191),
    "instrumen_id" SERIAL NOT NULL,

    CONSTRAINT "instrumen_pkey" PRIMARY KEY ("instrumen_id")
);

-- CreateTable
CREATE TABLE "rental" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(191) NOT NULL,
    "purpose" VARCHAR(191) NOT NULL,
    "actual_return_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "user_id" VARCHAR(191) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "instrumen_id" INTEGER NOT NULL,

    CONSTRAINT "rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" VARCHAR(191) NOT NULL,
    "sessionToken" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "email" VARCHAR(191),
    "name" VARCHAR(191),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailVerified" TIMESTAMP(3),
    "image" VARCHAR(191),
    "password" VARCHAR(191),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" VARCHAR(191) NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtoken" (
    "identifier" VARCHAR(191) NOT NULL,
    "token" VARCHAR(191) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_providerAccountId_key" ON "account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "authenticator_credentialID_key" ON "authenticator"("credentialID");

-- CreateIndex
CREATE INDEX "rental_instrumen_id_idx" ON "rental"("instrumen_id");

-- CreateIndex
CREATE INDEX "rental_user_id_idx" ON "rental"("user_id");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_userId_sessionToken_key" ON "session"("userId", "sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtoken_identifier_expires_key" ON "verificationtoken"("identifier", "expires");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_instrumen_id_fkey" FOREIGN KEY ("instrumen_id") REFERENCES "instrumen"("instrumen_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
