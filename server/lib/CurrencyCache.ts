import { LRUCache } from 'lru-cache';
import { rateObject } from 'easy-currencies/src/converter';

class CurrencyProviderRateCacheSingleton {
  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Singleton instance
  private static instance: LRUCache<string, rateObject>;

  public static get Instance(): LRUCache<string, rateObject> {
    if (CurrencyProviderRateCacheSingleton.instance === undefined) {
      CurrencyProviderRateCacheSingleton.instance = new LRUCache<string, rateObject>({
        // The maximum number of items that remain in the cache (assuming no TTL pruning or explicit deletions).
        // Note that fewer items may be stored if size calculation is used, and maxSize is exceeded.
        // This must be a positive finite integer.
        max: 5000,

        // How long to live in ms => 60 seconds for demonstration purposes
        ttl: 1000 * 60,

        // When using time-expiring entries with ttl, setting this to true will make each item's age reset to 0 whenever it is retrieved from cache with get().
        // Causing it to not expire. (It can still fall out of cache based on recency of use, of course.)
        updateAgeOnGet: false,
        // Same as above, but with has()
        updateAgeOnHas: false,
      });
    }
    return CurrencyProviderRateCacheSingleton.instance;
  }
}

// Export the singleton instance
export const CurrencyRateCacheInstance = CurrencyProviderRateCacheSingleton.Instance;
