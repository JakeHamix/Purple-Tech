interface ConversionRequestBody {
  fromCurrency: string;
  toCurrency: string;
  inputValue: number;
}

interface ConversionRequestResponse extends ConversionRequestBody {
  outputValue: number;
}

export { ConversionRequestBody, ConversionRequestResponse };
