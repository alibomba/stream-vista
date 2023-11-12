/*
  Warnings:

  - Added the required column `sourceUrl` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceUrl` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "sourceUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "sourceUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferencedCategories" TEXT[];
