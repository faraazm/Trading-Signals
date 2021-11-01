# Trading-Signals
* Do you ever get tired of staring at charts for stocks and crypto all day? 🥱
* Not sure when it's a good time to enter a trade? 🤷‍♂️
* Can't find a Free solution anywhere? 🤬
* Or you just don't have the time for it at all? ⌛

... Well, you've come to the right place! 🎉

This Node.js trading signals application will help solve your problem. It determines when it's the best time to enter a trade using a combination of multiple trade indicators. It will do all the staring for you!

## Strategy
The strategy is fairly simple. It uses the MACD and EMA indicators. A buy signal will be sent if all of the following conditions are true:
* The MACD line crosses above the Signal Line (change in trend)
* The crossover is below the 0.00 line on the Histogram
* Entry candle is above the 200 EMA (indication of an uptrend)

This MACD strategy is known to have a high success rate.

## Dependencies
Since we are taking the FREE route, some configurations have to be made. 

This application uses **SendGrid** for sending Email alerts. We are going with Email alerts because sending alerts via SMS becomes expensive over time.
You must get an [API Key from SendGrid](https://sendgrid.com/).

The same goes for **taapi.io**. Sign up for an account [here](https://taapi.io/) and you should receive an email containing the API key.

Create a `.env` file and assign the appropriate API keys like so:

```
SENDGRID_API_KEY='YOUR_API_KEY'
TAAPI_API_KEY='YOUR_API_KEY'
```

## Configuration
Currently the project only sends alerts for BTC/USDT and ETH/USDT. But you can modify this in the `config.js` file. `interval` represents the candle time interval. Setting the `interval` to `15m` means we are interested in 15m candles. You can change this to any of these time frames: `1m`, `5m`, `30m`, `1h`, `2h`, `4h`, `12h`, `1d`, `1w`.

```
const config = {
    tickers: [
        {
            ticker: 'BTC/USDT',
            interval: '15m'
        },
        {
            ticker: 'ETH/USDT',
            interval: '15m'
        }
    ],
    emails: ['YOUR EMAIL', 'ANOTHER EMAIL', 'AND ANOTHER'], // limit 100 per day
}
```

## Start the Project
Install dependencies:
```
npm install
```
Or if you are using Yarn:
```
yarn
```

Run the project:
```
node index
```

The application will log messages throughout time. Here's an example of how logs may look if there is a buying opportunity:
```
🎬 Starting up...
🔎 Analyzing BTC/USDT
💲 Sending buy signal... 💬
✔️ Buy alert for ETH/USDT sent successfully 📨
⏰ 15 minute email cooldown...
```

## Limitations
Since we are taking the FREE route, we have many limitations with this application. 

SendGrid only allows you to send 100 emails a day. Every time an email is sent, a 15 minute cooldown is set to avoid spamming emails every minute. Be wary that the more tickers and emails you have set in `config.js`, it's more likely you'll run into the daily limit.

As for taaapi.io, they only allow 1 API call per 15 seconds. So in consideration of their limit, I had to set intervals throughout the application to decrease the chances of getting errors.

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Contact
Faraaz Motiwala - [faraazmotiwala3@gmail.com](mailto:faraazmotiwala3@gmail.com)
