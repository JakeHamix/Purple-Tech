import * as Joi from 'joi';
import * as cc from 'currency-codes';

// This is not optimal, as the list is possibly incomplete - but it's good enough at this point, see https://github.com/freeall/currency-codes/issues
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
