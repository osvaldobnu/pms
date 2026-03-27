/*
  Warnings:

  - The values [CONFIGURACOES] on the enum `Menu` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Menu_new" AS ENUM ('DASHBOARD', 'MESAS', 'PRODUCAO', 'COZINHA', 'BAR', 'CAIXA', 'PRODUTOS', 'CATEGORIAS', 'USUARIOS', 'PERFIS');
ALTER TABLE "RolePermission" ALTER COLUMN "menu" TYPE "Menu_new" USING ("menu"::text::"Menu_new");
ALTER TYPE "Menu" RENAME TO "Menu_old";
ALTER TYPE "Menu_new" RENAME TO "Menu";
DROP TYPE "comanda"."Menu_old";
COMMIT;
