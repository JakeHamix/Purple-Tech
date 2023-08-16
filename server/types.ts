interface ConversionRequestBody {
  fromCurrency: string;
  toCurrency: string;
  inputValue: number;
}

interface ConversionRequestResponse extends ConversionRequestBody {
  outputValue: number;
  provider: string;
}

enum SupportedProviders {
  'ExchangeRateAPI' = 'ExchangeRateAPI',
  'ExchangeRatesAPIIO' = 'ExchangeRatesAPIIO',
  'OpenExchangeRates' = 'OpenExchangeRates',
  'CurrencyLayer' = 'CurrencyLayer',
  'AlphaVantage' = 'AlphaVantage',
  'Fixer' = 'Fixer',
}

export { ConversionRequestBody, ConversionRequestResponse, SupportedProviders };
