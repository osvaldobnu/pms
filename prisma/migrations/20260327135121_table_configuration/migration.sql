-- 1. Criar o enum (idempotente para shadow db)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'TableStatus') THEN
    CREATE TYPE "TableStatus" AS ENUM ('LIVRE', 'OCUPADA');
  END IF;
END$$;

-- 2. Converter coluna status (String → Enum)
ALTER TABLE "Table"
  ALTER COLUMN "status"
  TYPE "TableStatus"
  USING (
    CASE
      WHEN "status" = 'OCUPADA' THEN 'OCUPADA'::"TableStatus"
      ELSE 'LIVRE'::"TableStatus"
    END
  );

-- 3. Garantir NOT NULL (caso legacy tenha null)
ALTER TABLE "Table"
  ALTER COLUMN "status" SET NOT NULL;

-- 4. Adicionar coluna active
ALTER TABLE "Table"
  ADD COLUMN IF NOT EXISTS "active" BOOLEAN NOT NULL DEFAULT true;