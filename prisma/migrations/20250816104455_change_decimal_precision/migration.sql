/*
  Warnings:

  - You are about to alter the column `mape` on the `ForecastResult` table. The data in that column could be lost. The data in that column will be cast from `Decimal(6,2)` to `Decimal(6,3)`.
  - You are about to alter the column `mae` on the `ForecastResult` table. The data in that column could be lost. The data in that column will be cast from `Decimal(6,2)` to `Decimal(6,3)`.
  - You are about to alter the column `avgMae` on the `ForecastSummary` table. The data in that column could be lost. The data in that column will be cast from `Decimal(6,2)` to `Decimal(6,3)`.
  - You are about to alter the column `avgMape` on the `ForecastSummary` table. The data in that column could be lost. The data in that column will be cast from `Decimal(6,2)` to `Decimal(6,3)`.

*/
-- AlterTable
ALTER TABLE "ForecastResult" ALTER COLUMN "mape" SET DATA TYPE DECIMAL(6,3),
ALTER COLUMN "mae" SET DATA TYPE DECIMAL(6,3);

-- AlterTable
ALTER TABLE "ForecastSummary" ALTER COLUMN "avgMae" SET DATA TYPE DECIMAL(6,3),
ALTER COLUMN "avgMape" SET DATA TYPE DECIMAL(6,3);
