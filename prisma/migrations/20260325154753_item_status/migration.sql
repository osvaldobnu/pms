-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('PENDENTE', 'EM_PREPARO', 'PRONTO', 'ENTREGUE');

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "status" "ItemStatus" NOT NULL DEFAULT 'PENDENTE';
