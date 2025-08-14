/*
  Warnings:

  - You are about to drop the `playing_with_neon` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Point" 
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" VARCHAR(100) NOT NULL DEFAULT 'Título Padrão';

UPDATE "Point" SET "title" = 'Título padrão';

ALTER TABLE "Point" ALTER COLUMN "title" DROP DEFAULT;

-- DropTable
DROP TABLE "playing_with_neon";
