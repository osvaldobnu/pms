/*
  Warnings:

  - Added the required column `title` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Property" ADD COLUMN     "amenities" TEXT,
ADD COLUMN     "basePrice" DOUBLE PRECISION,
ADD COLUMN     "beach" TEXT,
ADD COLUMN     "bedConfig" JSONB,
ADD COLUMN     "beds" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "extraGuestPrice" DOUBLE PRECISION,
ADD COLUMN     "guests" INTEGER,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "locationNotes" TEXT,
ADD COLUMN     "ownerName" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "ranking" INTEGER,
ADD COLUMN     "rooms" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL;
