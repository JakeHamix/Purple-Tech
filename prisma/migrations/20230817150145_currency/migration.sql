/*
  Warnings:

  - You are about to alter the column `fromCurrency` on the `CurrencyConversion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(5)` to `Char(3)`.
  - You are about to alter the column `toCurrency` on the `CurrencyConversion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(5)` to `Char(3)`.

*/
-- AlterTable
ALTER TABLE "CurrencyConversion" ALTER COLUMN "fromCurrency" SET DATA TYPE CHAR(3),
ALTER COLUMN "toCurrency" SET DATA TYPE CHAR(3);
