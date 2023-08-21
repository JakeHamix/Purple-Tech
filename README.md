## ⚠️ Disclaimer
- The frontend is very minimalistic, don't be frightened - it just works
- The application is prepared to fetch data from various supported providers, but you will need to provide a valid API key. If you don't provide one, the default will be used.
  - [ExchangeRatesAPI](https://exchangeratesapi.io/) (default, no API key required)
  - [CurrencyLayer](https://currencylayer.com/) (requires an api key with base currency supoprt)
  - [OpenExchangeRates](https://openexchangerates.org/)
  - [AlphaVantage](https://currencylayer.com/)
  - [Fixer](https://fixer.io/) (requires an api key with base currency supoprt) 

## 🚀 Startup
- `npm run init`
  - Install modules, set up docker and prepare database schema
- `npm run build`
  - Prepare backend and frontend bundles for production serving (and docs!) 🛠️
- `npm run start`
  - Start the whole application

##  🧪 Tests
- There are mostly just placeholder tests, but the project is ready for them, based on [ts-jest](https://www.npmjs.com/package/ts-jest) 

## 📚  Documentation
- The available REST API is well documented using [apidoc](https://www.npmjs.com/package/apidoc). You can display the documentation by opening its [page](server/docs/index.html) in your browser (it's generated as a part of the build process!)