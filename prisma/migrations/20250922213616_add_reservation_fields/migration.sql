/*
  Warnings:

  - You are about to drop the column `amenities` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `basePrice` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `beach` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `bedConfig` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `beds` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `extraGuestPrice` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `guests` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `locationNotes` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `ranking` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `rooms` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Property` table. All the data in the column will be lost.
  - Added the required column `name` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "amenities",
DROP COLUMN "basePrice",
DROP COLUMN "beach",
DROP COLUMN "bedConfig",
DROP COLUMN "beds",
DROP COLUMN "description",
DROP COLUMN "extraGuestPrice",
DROP COLUMN "guests",
DROP COLUMN "location",
DROP COLUMN "locationNotes",
DROP COLUMN "ownerName",
DROP COLUMN "phone",
DROP COLUMN "ranking",
DROP COLUMN "rooms",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Reservation" ADD COLUMN     "commissionStatusJoao" TEXT,
ADD COLUMN     "commissionStatusMateus" TEXT,
ADD COLUMN     "commissionTotal" DOUBLE PRECISION,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "guestCount" INTEGER,
ADD COLUMN     "origin" TEXT,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paymentStatus" TEXT,
ADD COLUMN     "secondInstallmentDate" TIMESTAMP(3),
ADD COLUMN     "thirdInstallmentDate" TIMESTAMP(3);
