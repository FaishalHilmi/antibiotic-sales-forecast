/*
  Warnings:

  - Added the required column `period` to the `WeeklySales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeeklySales" ADD COLUMN     "period" INTEGER NOT NULL;
