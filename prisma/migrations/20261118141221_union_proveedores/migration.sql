/*
  Warnings:

  - Made the column `correo` on table `clientes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cargo` on table `empleados` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "clientes" ALTER COLUMN "correo" SET NOT NULL;

-- AlterTable
ALTER TABLE "empleados" ALTER COLUMN "cargo" SET NOT NULL;
