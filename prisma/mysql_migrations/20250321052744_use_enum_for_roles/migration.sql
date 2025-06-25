/*
  Warnings:

  - You are about to drop the column `layanan` on the `alat` table. All the data in the column will be lost.
  - You are about to drop the column `merk_alat` on the `alat` table. All the data in the column will be lost.
  - You are about to drop the column `tipe_alat` on the `alat` table. All the data in the column will be lost.
  - Added the required column `jumlah_alat` to the `Alat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlah_barang` to the `Barang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `alat` DROP COLUMN `layanan`,
    DROP COLUMN `merk_alat`,
    DROP COLUMN `tipe_alat`,
    ADD COLUMN `jumlah_alat` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `barang` ADD COLUMN `jumlah_barang` VARCHAR(255) NOT NULL;
