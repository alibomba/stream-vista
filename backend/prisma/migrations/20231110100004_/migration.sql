/*
  Warnings:

  - You are about to drop the column `cardCCV` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `facebookId` on the `User` table. All the data in the column will be lost.
  - Added the required column `cardCVV` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_facebookId_key";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "cardCCV",
ADD COLUMN     "cardCVV" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "facebookId",
ALTER COLUMN "email" SET NOT NULL;
