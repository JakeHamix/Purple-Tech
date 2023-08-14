import * as Router from '@koa/router';
import koaBody from 'koa-body';
import { ConversionRequestSchema } from './schema';
import { ConversionRequestBody, ConversionRequestResponse } from './types';

const router = new Router({
  prefix: '/api',
});

router.get('/ping', (ctx) => {
  // Sets the response code to 200
  ctx.body = 'Pong!';
});

router.post('/convert', koaBody(), async (ctx) => {
  try {
    // Validate the properties presence, format and values in the schema
    await ConversionRequestSchema.validateAsync(ctx.request.body);
    const payload: ConversionRequestBody = ctx.request.body;

    // Perform currency conversion logic here. Api calls, caching ...
    // console.log(ctx.localCache.get(fromCurrency));

    ctx.body = `I will convert ${payload.inputValue} units of ${payload.fromCurrency} to ${payload.toCurrency}`; // Provide the converted value
  } catch (err) {
    throw err;
  }
});

export { router };
