interface ConversionRequestBody extends Pick<CurrencyConversion, 'fromCurrency' | 'toCurrency' | 'inputValue'> {}

interface ConversionRequestResponse extends Omit<CurrencyConversion, 'outputValueUSD'> {}

enum SupportedProviders {
  'ExchangeRateAPI' = 'ExchangeRateAPI',
  'ExchangeRatesAPIIO' = 'ExchangeRatesAPIIO',
  'OpenExchangeRates' = 'OpenExchangeRates',
  'CurrencyLayer' = 'CurrencyLayer',
  'AlphaVantage' = 'AlphaVantage',
  'Fixer' = 'Fixer',
}

interface CurrencyConversion {
  provider: string;
  fromCurrency: string;
  toCurrency: string;
  inputValue: number;
  outputValue: number;
  outputValueUSD: number;
}

export { ConversionRequestBody, ConversionRequestResponse, SupportedProviders, CurrencyConversion };
