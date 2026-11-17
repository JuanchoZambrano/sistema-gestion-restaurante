/*
  Warnings:

  - You are about to alter the column `nombre` on the `categorias` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `nombre` on the `clientes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `telefono` on the `clientes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `correo` on the `clientes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `nombre` on the `empleados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `cargo` on the `empleados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `telefono` on the `empleados` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - A unique constraint covering the columns `[correo]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "categorias" ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "clientes" ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "telefono" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "correo" SET DATA TYPE VARCHAR(120);

-- AlterTable
ALTER TABLE "empleados" ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "cargo" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "telefono" SET DATA TYPE VARCHAR(20);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_correo_key" ON "clientes"("correo");
