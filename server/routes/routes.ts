import * as Router from '@koa/router';
import koaBody from 'koa-body';
import { ConversionRequestSchema } from '../schema';
import { ConversionRequestBody, ConversionRequestResponse, SupportedProviders } from '../types/Currency';
import CurrencyConvertor from '../lib/CurrencyConvertor';
import { UserException } from '../exceptions';

const router = new Router({
  prefix: '/api',
});

/**
 * @api {get} /api/ping Play a quick game of ping-pong with the server :)
 * @apiName Ping-Pong
 * @apiGroup Telemetry
 *
 * @apiVersion 0.0.0
 *
 * @apiDescription This endpoint should serve as a simple check that the server is up & running
 *
 * @apiSuccess (200) {String} result Pong!
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "result": "Pong!"
 * }
 *
 * @apiError (500) FatalError Something went horribly wrong!
 *
 */
router.get('/ping', (ctx) => {
  // Sets the response code to 200
  ctx.body = { result: 'Pong!' };
});

/**
 * @api {post} /api/convert Convert a value between currencies
 * @apiName ConvertCurrency
 * @apiGroup Currency
 *
 * @apiVersion 0.0.0
 *
 * @apiDescription This endpoint will convert any supported currency to a given currency. The value of the currency might not be exact because of small delays due to caching - use at your own risk!
 *
 * @apiHeader Content-Type:application/Json
 *
 * @apiBody {String} fromCurrency The currency code you want to convert from
 * @apiBody {String} toCurrency The currency code you want to convert to
 * @apiBody {Number} inputValue The numerical value you want to convert
 *
 * @apiSuccess (200) {String} provider The provider of the currency rate
 * @apiSuccess (200) {String} fromCurrency The currency code the conversion is from
 * @apiSuccess (200) {String} toCurrency The currency code the conversion is to
 * @apiSuccess (200) {Number} inputValue The numerical value used for conversion
 * @apiSuccess (200) {Number} outputValue The numerical value of the converted currency
 *
 * @apiError (500) FatalError Something went horribly wrong!
 * @apiError (400) SchemaError The request payload is in invalid format
 * @apiErrorExample {json} Error-Response:
 *
 *  {
 *   "message": "The conversion failed: Invalid API key!.",
 *   "error": {
 *     "message": "The conversion failed: Invalid API key!.",
 *     "code": 500,
 *     "meta": {
 *       "err": "Invalid API key!",
 *       "provider": "OpenExchangeRates",
 *       "fromCurrency": "EUR",
 *       "toCurrency": "CZK",
 *       "inputValue": 1
 *     }
 *   }
 * }
 */
router.post('/convert', koaBody(), async (ctx) => {
  // TODO: Ratelimiter @https://www.npmjs.com/package/limiter
  try {
    // Validate the properties presence, format and values in the schema
    await ConversionRequestSchema.validateAsync(ctx.request.body).catch((err) => {
      throw new UserException('The request payload is in invalid format, see errors below.', 400, { err });
    });
    const payload: ConversionRequestBody = ctx.request.body;
    const { fromCurrency, toCurrency, inputValue } = payload;

    // Hard coded the rates provider here, but it can easily be changed
    const provider: SupportedProviders = SupportedProviders.OpenExchangeRates;

    // Perform currency conversion logic here. Api calls, caching ...
    const convertor = new CurrencyConvertor(fromCurrency, toCurrency, inputValue, provider);
    const convertedValue = await convertor.convert();

    const response: ConversionRequestResponse = {
      provider,
      fromCurrency,
      toCurrency,
      inputValue,
      outputValue: convertedValue,
    };

    ctx.body = response;
  } catch (err) {
    throw err;
  }
});

export { router };
