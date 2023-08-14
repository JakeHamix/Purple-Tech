import { CurrencyRateCacheInstance } from './CurrencyCache';
import { Converter } from 'easy-currencies';

class CurrencyConvertor {
  fromCurrency: string;
  toCurrency: string;
  inputValue: number;
  private provider: string;
  private converterKey: string;

  constructor(fromCurrency: string, toCurrency: string, inputValue: number, provider: string = 'OpenExchangeRates') {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.inputValue = inputValue;
    this.provider = provider;
    this.converterKey = `${provider}:${fromCurrency}`;
  }

  async convert(): number {
    const cachedRates = CurrencyRateCacheInstance.get(this.converterKey);

    if (!cachedRates) {
      // TODO: This is dangerous and could be used to leak env variables!
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const converter = new Converter(this.provider, process.env[`${this.provider.toUpperCase()}_API_KEY`]);
      const rates = await converter.getRates(this.fromCurrency, this.toCurrency);
      CurrencyRateCacheInstance.set(this.converterKey, rates);

      // TODO: Should limit the case of recursive calls in case something goes horribly wrong
      // Recursive call
      return this.convert();
    }

    return new Converter().convertRate(this.inputValue, this.toCurrency, cachedRates);
  }
}

export default CurrencyConvertor;
