-- CreateTable
CREATE TABLE "CurrencyConversion" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromCurrency" VARCHAR(5) NOT NULL,
    "toCurrency" VARCHAR(5) NOT NULL,
    "inputValue" DOUBLE PRECISION NOT NULL,
    "outputValue" DOUBLE PRECISION NOT NULL,
    "outputValueUSD" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CurrencyConversion_pkey" PRIMARY KEY ("id")
);
