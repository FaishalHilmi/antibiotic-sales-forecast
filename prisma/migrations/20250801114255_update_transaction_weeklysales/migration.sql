/*
  Warnings:

  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "DetailTransaction" DROP CONSTRAINT "DetailTransaction_transactionId_fkey";

-- AlterTable
ALTER TABLE "DetailTransaction" ALTER COLUMN "transactionId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transaction_id_seq";

-- CreateTable
CREATE TABLE "WeeklySales" (
    "id" SERIAL NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "medicineId" INTEGER NOT NULL,
    "quantitySold" INTEGER NOT NULL,
    "totalRevenue" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "WeeklySales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeeklySales_medicineId_weekNumber_year_key" ON "WeeklySales"("medicineId", "weekNumber", "year");

-- AddForeignKey
ALTER TABLE "DetailTransaction" ADD CONSTRAINT "DetailTransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklySales" ADD CONSTRAINT "WeeklySales_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
