-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('MESERO', 'GERENTE');

-- DropIndex
DROP INDEX "clientes_correo_key";

-- AlterTable
ALTER TABLE "clientes" ALTER COLUMN "nombre" SET DATA TYPE TEXT,
ALTER COLUMN "telefono" SET DATA TYPE TEXT,
ALTER COLUMN "correo" DROP NOT NULL,
ALTER COLUMN "correo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "empleados" ALTER COLUMN "nombre" SET DATA TYPE TEXT,
ALTER COLUMN "cargo" DROP NOT NULL,
ALTER COLUMN "cargo" SET DATA TYPE TEXT,
ALTER COLUMN "telefono" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'MESERO',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");
