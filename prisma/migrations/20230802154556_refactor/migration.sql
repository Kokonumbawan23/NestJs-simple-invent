/*
  Warnings:

  - You are about to drop the column `total` on the `Barang` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('GOOD', 'FINE', 'BAD');

-- AlterTable
ALTER TABLE "Barang" DROP COLUMN "total",
ADD COLUMN     "condition" "Condition" NOT NULL DEFAULT 'GOOD',
ADD COLUMN     "tipeId" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Tipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_tipeId_fkey" FOREIGN KEY ("tipeId") REFERENCES "Tipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
