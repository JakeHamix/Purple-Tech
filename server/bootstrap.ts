import 'dotenv/config';
import * as Koa from 'koa';
import { router } from './routes';
import { LRUCache } from 'lru-cache';

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

  // Create and expose the local process cache
  const cache = new LRUCache({
    max: 5000,

    // How long to live in ms => 60 seconds for demonstration purposes
    ttl: 1000 * 60,

    // When using time-expiring entries with ttl, setting this to true will make each item's age reset to 0 whenever it is retrieved from cache with get().
    // Causing it to not expire. (It can still fall out of cache based on recency of use, of course.)
    updateAgeOnGet: true,
    // Same as above, but with has()
    updateAgeOnHas: true,
  });

  // app.context is the prototype from which ctx is created.
  // You may add additional properties to ctx by editing app.context.
  // This is useful for adding properties or methods to ctx to be used across your entire app
  app.context.localCache = cache;

  return app;
}

export default initializeApp;
