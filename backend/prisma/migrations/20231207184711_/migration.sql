/*
  Warnings:

  - You are about to alter the column `startSecond` on the `Subtitle` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `endSecond` on the `Subtitle` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Subtitle" ALTER COLUMN "startSecond" SET DATA TYPE INTEGER,
ALTER COLUMN "endSecond" SET DATA TYPE INTEGER;
