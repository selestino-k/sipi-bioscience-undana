/*
  Warnings:

  - The primary key for the `alat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `alatId` on the `alat` table. All the data in the column will be lost.
  - The primary key for the `bahan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bahanId` on the `bahan` table. All the data in the column will be lost.
  - The primary key for the `barang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `barangId` on the `barang` table. All the data in the column will be lost.
  - The primary key for the `instrumen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `instrumenId` on the `instrumen` table. All the data in the column will be lost.
  - The primary key for the `rental` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `instrumenId` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `rental` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `rental` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `status` on the `rental` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user` table. All the data in the column will be lost.
  - Added the required column `alat_id` to the `Alat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bahan_id` to the `Bahan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barang_id` to the `Barang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instrument_id` to the `Instrumen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instrument_id` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `authenticator` DROP FOREIGN KEY `Authenticator_userId_fkey`;

-- DropForeignKey
ALTER TABLE `rental` DROP FOREIGN KEY `Rental_instrumenId_fkey`;

-- DropForeignKey
ALTER TABLE `rental` DROP FOREIGN KEY `Rental_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropIndex
DROP INDEX `Account_userId_fkey` ON `account`;

-- DropIndex
DROP INDEX `Rental_instrumenId_idx` ON `rental`;

-- DropIndex
DROP INDEX `Rental_userId_idx` ON `rental`;

-- DropIndex
DROP INDEX `Session_userId_fkey` ON `session`;

-- AlterTable
ALTER TABLE `alat` DROP PRIMARY KEY,
    DROP COLUMN `alatId`,
    ADD COLUMN `alat_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`alat_id`);

-- AlterTable
ALTER TABLE `bahan` DROP PRIMARY KEY,
    DROP COLUMN `bahanId`,
    ADD COLUMN `bahan_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`bahan_id`);

-- AlterTable
ALTER TABLE `barang` DROP PRIMARY KEY,
    DROP COLUMN `barangId`,
    ADD COLUMN `barang_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`barang_id`);

-- AlterTable
ALTER TABLE `instrumen` DROP PRIMARY KEY,
    DROP COLUMN `instrumenId`,
    ADD COLUMN `instrument_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`instrument_id`);

-- AlterTable
ALTER TABLE `rental` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `endDate`,
    DROP COLUMN `instrumenId`,
    DROP COLUMN `notes`,
    DROP COLUMN `startDate`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `actual_return_date` DATETIME(3) NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `instrument_id` INTEGER NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `status` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `role`,
    DROP COLUMN `userId`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Authenticator` ADD CONSTRAINT `Authenticator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_instrument_id_fkey` FOREIGN KEY (`instrument_id`) REFERENCES `Instrumen`(`instrument_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
