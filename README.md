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
- If you want to run the application from the source, use `npm run start:dev`

##  🧪 Tests
- There are mostly just placeholder tests, but the project is ready for them, based on [ts-jest](https://www.npmjs.com/package/ts-jest) 

## 📚  Documentation
- The available REST API is well documented using [apidoc](https://www.npmjs.com/package/apidoc). You can display the documentation by opening its [page](server/docs/index.html) in your browser (it's generated as a part of the build process!)

## ✏ Notes
To make things a little easier, this application makes use of [easy currencies](https://www.npmjs.com/package/easy-currencies) 😄. It's a simple Axios wrapper, which claims to do safe numeric conversions. But as far as I could tell, it doesn't deal with Floating-point precision well at all ❗, so I would consider replacing it in the future if very precise calculations are of interest.

The backend is built with [koa](https://www.npmjs.com/package/koa) 🛠️ and some of its plugins. As for the database, I chose the easy path and used a PostgreSQL docker along with [prisma](https://www.npmjs.com/package/prisma) 🐘.

API consists of standard, documented REST routes, with SSE being the interesting part (websockets are overused and problematic).

As for the frontend, it's a simple React app made mostly using [bootstrap](https://www.npmjs.com/package/react-bootstrap) components 🎨.

## 📏 TODOs
- A rate-limiter is definitely something that should be implemented ⏳, especially considering we are calling an external API(s)
- Application (red)locks for rate fetches could also be viable 🔒, but due to caching it's not critical
- A very interesting part would be a Redis based scoreboard/leaderboard 🏆. The aggregated statistics are a plain ol' SQL query, but if we used the currencies as 'players' 🎮 we could have quick access to some interesting scenarios
- The frontend `convert` button could also use some `debounce/throttle` mechanism ⚡

## 📝 Final note
I have intentionally avoided 'heavy' modules for demonstration purposes. The first version of this application was created using [Redwood](https://redwoodjs.com/) and while it was pretty cool, it did most of the job for me 🤖.
Maybe I could have made the React components Classes instead of Functional, but no regrets there so far!
