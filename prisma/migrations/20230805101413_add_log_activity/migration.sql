-- CreateTable
CREATE TABLE "LogActivity" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activity" TEXT NOT NULL,
    "barangId" INTEGER NOT NULL,

    CONSTRAINT "LogActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LogActivity" ADD CONSTRAINT "LogActivity_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
