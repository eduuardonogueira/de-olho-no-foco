/*
  Warnings:

  - You are about to drop the column `isAnonymous` on the `Point` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Point" DROP COLUMN "isAnonymous",
ADD COLUMN     "is_anonymous" BOOLEAN NOT NULL DEFAULT false;
