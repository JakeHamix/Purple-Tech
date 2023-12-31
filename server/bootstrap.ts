import 'dotenv/config';
import * as Koa from 'koa';
import { router } from './routes/routes';
import cors = require('@koa/cors');


// Your custom initialization logic
// For example, registering routes, plugins, etc.
function initializeApp() {
  const app = new Koa();

  // Enable cors
  app.use(cors())

  // Pretty pino local logs for local development and debugging
  // if (process.env.NODE_ENV === 'development') {
  //   app.use(pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     }
  //   }));
  // }
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // Handle the error
      console.error('An error occurred:', err);

      // Set an appropriate response status and body
      // TODO: do not expose sensitive information, error stacks, etc.
      ctx.status = err.status || err.code || 500;
      ctx.body = {
        message: err.message || 'Internal Server Error',
        error: err,
      };
    }
  });

  app.use(router.routes());

  // Add error logging
  app.on('error', (err) => {
    console.log(err);
  });

  app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Koa server is listening on port ${process.env.BACKEND_PORT}`);
  });

  // TODO: The app will periodically send information about the current statistics to clients using SSE
  //  https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events


  // app.context is the prototype from which ctx is created.
  // You may add additional properties to ctx by editing app.context.
  // This is useful for adding properties or methods to ctx to be used across your entire app
  // app.context.localCache = cache;

  return app;
}

export default initializeApp;
