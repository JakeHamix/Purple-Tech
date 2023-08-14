import 'dotenv/config';
import * as Koa from 'koa';
import { router } from './routes';

// Your custom initialization logic
// For example, registering routes, plugins, etc.
function initializeApp() {
  const app = new Koa();

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // Handle the error
      console.error('An error occurred:', err);

      // Set an appropriate response status and body
      ctx.status = err.status || 500;
      ctx.body = {
        error: err.message || 'Internal Server Error',
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

  // app.context is the prototype from which ctx is created.
  // You may add additional properties to ctx by editing app.context.
  // This is useful for adding properties or methods to ctx to be used across your entire app
  // app.context.localCache = cache;

  return app;
}

export default initializeApp;
