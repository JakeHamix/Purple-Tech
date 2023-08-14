import { CurrencyProviderCacheInstance } from './CurrencyCache';
import { Converter, Convert } from 'easy-currencies';

class CurrencyConvertor {
  fromCurrency: string;
  toCurrency: string;
  inputValue: number;
  private provider: string;

  constructor(fromCurrency: string, toCurrency: string, inputValue: number, provider: string = 'OpenExchangeRates') {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.inputValue = inputValue;
    this.provider = provider;
  }

  async convert() {
    const converterKey = `${this.provider}:${this.fromCurrency}`;
    const converter = CurrencyProviderCacheInstance.get(converterKey);

    if (!converter) {
      // TODO: This is dangerous and could be used to leak env variables!
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const converter = new Converter(this.provider, process.env[`${this.provider.toUpperCase()}_API_KEY`]);
      CurrencyProviderCacheInstance.set(converterKey, await Convert().from(this.fromCurrency).fetch());
    }
  }
}

export default CurrencyConvertor;
