/*
  Warnings:

  - A unique constraint covering the columns `[userId,seriesId]` on the table `ToWatch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,movieId]` on the table `ToWatch` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ToWatch_userId_seriesId_key" ON "ToWatch"("userId", "seriesId");

-- CreateIndex
CREATE UNIQUE INDEX "ToWatch_userId_movieId_key" ON "ToWatch"("userId", "movieId");
