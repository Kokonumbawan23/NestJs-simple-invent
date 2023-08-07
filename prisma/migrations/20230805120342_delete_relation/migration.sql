/*
  Warnings:

  - You are about to drop the column `barangId` on the `LogActivity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LogActivity" DROP CONSTRAINT "LogActivity_barangId_fkey";

-- AlterTable
ALTER TABLE "LogActivity" DROP COLUMN "barangId";
