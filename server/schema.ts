import * as Joi from 'joi';
import * as cc from 'currency-codes';

const currencyCodeList = cc.data.map((currency) => currency.code);

const ConversionRequestSchema = Joi.object({
  fromCurrency: Joi.string()
    .valid(...currencyCodeList)
    .required(),
  toCurrency: Joi.string()
    .valid(...currencyCodeList)
    .required(),
  inputValue: Joi.number().required(),
});

export { ConversionRequestSchema };
