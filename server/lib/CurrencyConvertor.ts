import { CurrencyRateCacheInstance } from './CurrencyCache';
import { Converter } from 'easy-currencies';
import { SupportedProviders, CurrencyConversion, CurrencyConversionStatistics } from '../types/Currency';
import { providers } from 'easy-currencies/dist/parts/providers';
import { ConvertorException } from '../exceptions';
import prisma from '../../prisma/client';

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
        const converter = new Converter(this.provider/*, process.env[`${this.provider.toUpperCase()}_API_KEY`]*/);

        // Remove the default fallback API
        // converter.remove(providers.ExchangeRateAPI);
        const rates = await converter.getRates(this.fromCurrency, this.toCurrency, true);
        CurrencyRateCacheInstance.set(this.converterKey, rates);

        // TODO: Should limit the case of recursive calls in case something goes horribly wrong
        // Recursive call
        return this.convert();
      }

      // Assume that the rates has USD by default, since we are pulling the whole list. If it isn't present, we'll have a problem.
      const converter = new Converter();
      const convertedValue = await converter.convertRate(this.inputValue, this.toCurrency, cachedRates);
      const convertedValueUSD = await converter.convertRate(this.inputValue, 'USD', cachedRates);

      // Store the conversion
      await this.storeConversion({
        provider: this.provider,
        fromCurrency: this.fromCurrency,
        toCurrency: this.toCurrency,
        inputValue: this.inputValue,
        outputValue: convertedValue,
        outputValueUSD: convertedValueUSD,
      });

      return convertedValue;
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

  async storeConversion(conversion: CurrencyConversion) {
    await prisma.currencyConversion.create({
      data: conversion,
    });
  }

  /**
   * Retrieves the following information about the conversions made:
   * - Most popular destination currency
   * - Total amount converted (in USD)
   * - Total number of conversion requests made
   */
  static async getConversionStatistics(): Promise<CurrencyConversionStatistics> {
    try {
      const [[{toCurrency: mostPopularCurrency}], {
        _count: conversionsCount,
        _sum: {outputValueUSD: amountConvertedUSD}
      }] = await Promise.all([
        prisma.currencyConversion.groupBy({
          by: ['toCurrency'],
          orderBy: {
            _count: {
              toCurrency: 'desc',
            }
          },
          take: 1,
        }),
        prisma.currencyConversion.aggregate({
          _count: true,
          _sum: {
            'outputValueUSD': true,
          }
        }),
      ]);
      return {
        mostPopularCurrency,
        amountConvertedUSD,
        conversionsCount,
      }
    } catch (err) {
      console.log(err);
      // Expected to happen if there are no records in the database => there is nothing to destructure
      return {
        mostPopularCurrency: '???',
        amountConvertedUSD: 0,
        conversionsCount: 0,
      }
    }
  }
}

export default CurrencyConvertor;
