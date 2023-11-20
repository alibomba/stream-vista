/*
  Warnings:

  - A unique constraint covering the columns `[episodeId,userId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movieId,userId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Track_episodeId_userId_key" ON "Track"("episodeId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_movieId_userId_key" ON "Track"("movieId", "userId");
