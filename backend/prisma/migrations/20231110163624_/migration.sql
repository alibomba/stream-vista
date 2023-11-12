/*
  Warnings:

  - Added the required column `subscriptionLengthInMonths` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "subscriptionLengthInMonths" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "MembershipCancellation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cancellationDate" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MembershipCancellation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MembershipCancellation_userId_key" ON "MembershipCancellation"("userId");

-- AddForeignKey
ALTER TABLE "MembershipCancellation" ADD CONSTRAINT "MembershipCancellation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
