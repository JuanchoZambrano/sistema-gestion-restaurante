/*
  Warnings:

  - You are about to drop the column `categoria_id` on the `platos` table. All the data in the column will be lost.
  - Added the required column `stock` to the `ingredientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriaId` to the `platos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "platos" DROP CONSTRAINT "platos_categoria_id_fkey";

-- AlterTable
ALTER TABLE "empleados" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "ingredientes" ADD COLUMN     "stock" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "platos" DROP COLUMN "categoria_id",
ADD COLUMN     "categoriaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "plato_ingrediente" (
    "platoId" INTEGER NOT NULL,
    "ingredienteId" INTEGER NOT NULL,
    "cantidad" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "plato_ingrediente_pkey" PRIMARY KEY ("platoId","ingredienteId")
);

-- AddForeignKey
ALTER TABLE "platos" ADD CONSTRAINT "platos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plato_ingrediente" ADD CONSTRAINT "plato_ingrediente_platoId_fkey" FOREIGN KEY ("platoId") REFERENCES "platos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plato_ingrediente" ADD CONSTRAINT "plato_ingrediente_ingredienteId_fkey" FOREIGN KEY ("ingredienteId") REFERENCES "ingredientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
