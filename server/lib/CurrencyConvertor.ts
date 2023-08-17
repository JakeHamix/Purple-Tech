import { CurrencyRateCacheInstance } from './CurrencyCache';
import { Converter } from 'easy-currencies';
import { SupportedProviders } from '../types/Currency';
import { providers } from 'easy-currencies/dist/parts/providers';
import { ConvertorException } from '../exceptions';
import { PrismaClient } from '@prisma/client'

class CurrencyConvertor {
  fromCurrency: string;
  toCurrency: string;
  inputValue: number;
  private provider: SupportedProviders;
  private converterKey: string;

  constructor(fromCurrency: string, toCurrency: string, inputValue: number, provider: SupportedProviders) {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.inputValue = inputValue;
    this.provider = provider;
    this.converterKey = `${provider}:${fromCurrency}`;
  }

  async convert(): Promise<number> {
    try {
      const cachedRates = CurrencyRateCacheInstance.get(this.converterKey);

      // TODO: Consider moving this re-validation fetch to the lru-cache:fetchMethod, or disposeAfter (https://www.npmjs.com/package/lru-cache#fetchMethod)
      if (!cachedRates) {
        // TODO: This is dangerous and could be used to leak unintended env variables! The type-check is not secure enough.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const converter = new Converter(this.provider, process.env[`${this.provider.toUpperCase()}_API_KEY`]);

        // Remove the default fallback API
        converter.remove(providers.ExchangeRateAPI);
        const rates = await converter.getRates(this.fromCurrency, this.toCurrency);
        CurrencyRateCacheInstance.set(this.converterKey, rates);

        // TODO: Should limit the case of recursive calls in case something goes horribly wrong
        // Recursive call
        return this.convert();
      }

      return new Converter().convertRate(this.inputValue, this.toCurrency, cachedRates);
    } catch (err) {
      throw new ConvertorException(`The conversion failed: ${err?.message || err}.`, 500, {
        err,
        provider: this.provider,
        fromCurrency: this.fromCurrency,
        toCurrency: this.toCurrency,
        inputValue: this.inputValue,
      });
    }
  }

  async storeConversion() {
    // TODO: Store the conversion details in DB, this is the minimum:
    //  -Most popular destination currency
    //  -Total amount converted (in USD)
    //  -Total number of conversion requests made
  }

  async getConversionStatistics() {

  }
}

export default CurrencyConvertor;
