-- CreateEnum
CREATE TYPE "public"."Goal" AS ENUM ('WEIGHT_LOSS', 'MUSCLE_GAIN', 'MAINTAIN');

-- CreateTable
CREATE TABLE "public"."DietPlan" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "idade" INTEGER,
    "pesoAtual" DOUBLE PRECISION,
    "altura" DOUBLE PRECISION,
    "pesoMeta" DOUBLE PRECISION,
    "objetivo" "public"."Goal" NOT NULL,
    "exercicios" TEXT,
    "caloriasEstimadas" INTEGER,
    "tempoEstimado" TEXT,
    "plano" JSONB NOT NULL,
    "emailEnviado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DietPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DietPlan_email_idx" ON "public"."DietPlan"("email");

-- CreateIndex
CREATE INDEX "DietPlan_createdAt_idx" ON "public"."DietPlan"("createdAt");
