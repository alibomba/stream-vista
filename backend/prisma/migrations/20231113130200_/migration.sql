/*
  Warnings:

  - You are about to drop the column `isSubscriptionPaid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `MembershipCancellation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MembershipCancellation" DROP CONSTRAINT "MembershipCancellation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isSubscriptionPaid";

-- DropTable
DROP TABLE "MembershipCancellation";

-- DropTable
DROP TABLE "Subscription";
