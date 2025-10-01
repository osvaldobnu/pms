/*
  Warnings:

  - You are about to drop the column `commissionStatusJoao` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `commissionStatusMateus` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Reservation" DROP COLUMN "commissionStatusJoao",
DROP COLUMN "commissionStatusMateus";
