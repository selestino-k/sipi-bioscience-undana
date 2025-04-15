/*
  Warnings:

  - The primary key for the `instrumen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `instrument_id` on the `instrumen` table. All the data in the column will be lost.
  - You are about to drop the column `instrument_id` on the `rental` table. All the data in the column will be lost.
  - Added the required column `instrumen_id` to the `Instrumen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instrumen_id` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rental` DROP FOREIGN KEY `Rental_instrument_id_fkey`;

-- DropIndex
DROP INDEX `Rental_instrument_id_fkey` ON `rental`;

-- AlterTable
ALTER TABLE `instrumen` DROP PRIMARY KEY,
    DROP COLUMN `instrument_id`,
    ADD COLUMN `image_url` VARCHAR(191) NULL,
    ADD COLUMN `instrumen_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`instrumen_id`);

-- AlterTable
ALTER TABLE `rental` DROP COLUMN `instrument_id`,
    ADD COLUMN `instrumen_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_instrumen_id_fkey` FOREIGN KEY (`instrumen_id`) REFERENCES `Instrumen`(`instrumen_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
