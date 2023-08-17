/*
  Warnings:

  - Added the required column `provider` to the `CurrencyConversion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurrencyConversion" ADD COLUMN     "provider" VARCHAR(100) NOT NULL;
