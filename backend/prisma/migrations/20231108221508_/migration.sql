/*
  Warnings:

  - You are about to drop the `Actor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActorToSeries` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasons` to the `Series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailerUrl` to the `Series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ActorToSeries" DROP CONSTRAINT "_ActorToSeries_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActorToSeries" DROP CONSTRAINT "_ActorToSeries_B_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "name" VARCHAR(150) NOT NULL;

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "actors" TEXT[],
ADD COLUMN     "creators" TEXT[],
ADD COLUMN     "seasons" INTEGER NOT NULL,
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "trailerUrl" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Actor";

-- DropTable
DROP TABLE "_ActorToSeries";

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "episodeNumber" INTEGER NOT NULL,
    "minutes" INTEGER NOT NULL,
    "seriesId" TEXT NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "trailerUrl" TEXT NOT NULL,
    "warnings" TEXT[],
    "actors" TEXT[],
    "creators" TEXT[],
    "minutes" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtitle" (
    "id" TEXT NOT NULL,
    "startSecond" DOUBLE PRECISION NOT NULL,
    "endSecond" DOUBLE PRECISION NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "language" TEXT NOT NULL,
    "episodeId" TEXT,
    "movieId" TEXT,

    CONSTRAINT "Subtitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToWatch" (
    "id" TEXT NOT NULL,
    "seriesId" TEXT,
    "movieId" TEXT,

    CONSTRAINT "ToWatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToSeries" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToSeries_AB_unique" ON "_CategoryToSeries"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToSeries_B_index" ON "_CategoryToSeries"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToMovie_AB_unique" ON "_CategoryToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToMovie_B_index" ON "_CategoryToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToWatch" ADD CONSTRAINT "ToWatch_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToWatch" ADD CONSTRAINT "ToWatch_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSeries" ADD CONSTRAINT "_CategoryToSeries_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSeries" ADD CONSTRAINT "_CategoryToSeries_B_fkey" FOREIGN KEY ("B") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMovie" ADD CONSTRAINT "_CategoryToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMovie" ADD CONSTRAINT "_CategoryToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
