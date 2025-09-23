/*
  Warnings:

  - You are about to drop the column `address` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `condo` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Property` table. All the data in the column will be lost.
  - Added the required column `beds` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guests` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "address",
DROP COLUMN "condo",
DROP COLUMN "features",
ADD COLUMN     "amenities" TEXT,
ADD COLUMN     "beach" TEXT,
ADD COLUMN     "beds" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "extraGuestFee" DOUBLE PRECISION,
ADD COLUMN     "guests" INTEGER NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "locationNotes" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "ranking" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL;
