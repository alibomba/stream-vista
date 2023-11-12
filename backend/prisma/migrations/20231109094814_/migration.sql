/*
  Warnings:

  - You are about to drop the `_CategoryToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToSeries` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `ToWatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isMovie` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToMovie" DROP CONSTRAINT "_CategoryToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToMovie" DROP CONSTRAINT "_CategoryToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToSeries" DROP CONSTRAINT "_CategoryToSeries_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToSeries" DROP CONSTRAINT "_CategoryToSeries_B_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "categories" TEXT[];

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "categories" TEXT[];

-- AlterTable
ALTER TABLE "ToWatch" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "episodeId" TEXT,
ADD COLUMN     "isMovie" BOOLEAN NOT NULL,
ADD COLUMN     "isOnHomepage" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "movieId" TEXT,
ADD COLUMN     "timestamp" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CategoryToMovie";

-- DropTable
DROP TABLE "_CategoryToSeries";

-- AddForeignKey
ALTER TABLE "ToWatch" ADD CONSTRAINT "ToWatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
