/*
  Warnings:

  - The values [ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "StockAction" AS ENUM ('IN', 'OUT');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('PHARMACIST', 'CASHIER');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropEnum
DROP TYPE "Action";

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "stock" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockLog" (
    "id" SERIAL NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "action" "StockAction" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "note" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "cashierId" INTEGER NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailTransaction" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "DetailTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesRecap" (
    "id" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "totalTransactions" INTEGER NOT NULL,
    "totalSoldQuantity" INTEGER NOT NULL,
    "grossRevenue" DECIMAL(65,30) NOT NULL,
    "topSellingMedicine" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medicineId" INTEGER NOT NULL,

    CONSTRAINT "SalesRecap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesRecapDetail" (
    "id" SERIAL NOT NULL,
    "salesRecapId" INTEGER NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "quantitySold" INTEGER NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "totalRevenue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SalesRecapDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForecastHistory" (
    "id" SERIAL NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "forecastDate" TIMESTAMP(3) NOT NULL,
    "period" INTEGER NOT NULL,

    CONSTRAINT "ForecastHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForecastResult" (
    "id" SERIAL NOT NULL,
    "historyId" INTEGER NOT NULL,
    "periodLabel" TEXT NOT NULL,
    "actualValue" DECIMAL(12,2),
    "forecastValue" DECIMAL(12,2),
    "mape" DECIMAL(6,2),
    "mae" DECIMAL(6,2),

    CONSTRAINT "ForecastResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForecastSummary" (
    "id" SERIAL NOT NULL,
    "historyId" INTEGER NOT NULL,
    "weightMethod" TEXT NOT NULL,
    "avgMae" DECIMAL(6,2) NOT NULL,
    "avgMape" DECIMAL(6,2) NOT NULL,

    CONSTRAINT "ForecastSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForecastSummary_historyId_key" ON "ForecastSummary"("historyId");

-- AddForeignKey
ALTER TABLE "StockLog" ADD CONSTRAINT "StockLog_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaction" ADD CONSTRAINT "DetailTransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaction" ADD CONSTRAINT "DetailTransaction_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesRecap" ADD CONSTRAINT "SalesRecap_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesRecapDetail" ADD CONSTRAINT "SalesRecapDetail_salesRecapId_fkey" FOREIGN KEY ("salesRecapId") REFERENCES "SalesRecap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesRecapDetail" ADD CONSTRAINT "SalesRecapDetail_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForecastHistory" ADD CONSTRAINT "ForecastHistory_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForecastResult" ADD CONSTRAINT "ForecastResult_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "ForecastHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForecastSummary" ADD CONSTRAINT "ForecastSummary_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "ForecastHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
