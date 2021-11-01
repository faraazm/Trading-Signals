require('dotenv').config()
const axios = require('axios')
const yahooStockPrices = require('yahoo-stock-prices')
const sendGridMail = require('@sendgrid/mail')
const { setIntervalAsync } = require('set-interval-async/dynamic')
const { tickers, emails } = require('./config')

let emailSent = false

async function sendBuySignal(ticker, interval) {
  const { ema, macd } = await getMACDandEMA(ticker, interval)
  const { valueMACD, valueMACDSignal } = macd
  const yahooTicker = ticker.includes('/') ? `${ticker.split('/')[0]}-USD` : ticker

  const { price } = await yahooStockPrices.getCurrentData(yahooTicker)

  if (
    price > ema.value &&
    valueMACD < 0 &&
    valueMACDSignal < 0 &&
    valueMACD > valueMACDSignal
  ) {
    console.log('💲 Sending buy signal... 💬')
    await sendEmail(ticker, data.price)
  } else {
    console.log(`❌ Don't buy yet. Retesting...`)
  }
}

async function sendEmail(ticker, price) {
  sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

  const message = {
    from: 'faraazmotiwala3@gmail.com',
    subject: `Buy alert for ${ticker}`,
    text: `Current Price: ${price}`,
    html: `Current Price: ${price}`,
  }

  try {
    // Looping through Email list
    Promise.all(emails.map(async (email) => {
      message.to = email
      await sendGridMail.send(message)
    }))

    // Flag used to create a cooldown when sending Emails to reduce SPAM
    emailSent = true
    console.log(`✔️ Buy alert for ${ticker} sent successfully to ${email} 📨`)
  } catch (error) {
    console.log('☠️ Error with sending email ☠️')
  }
}

async function getMACDandEMA(ticker, interval) {
  const response = await axios.post('https://api.taapi.io/bulk', {
    secret: process.env.TAAPI_API_KEY,
    construct: {
      exchange: 'binance',
      symbol: ticker,
      interval: interval,
      indicators: [
        {
          indicator: 'ema',
          period: 200,
        },
        {
          indicator: 'macd',
        },
      ],
    },
  })

  return {
    ema: response.data.data[0].result,
    macd: response.data.data[1].result,
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function start() {
  for (let i = 0; i < tickers.length; i++) {
    console.log(`🔎 Analyzing ${tickers[i].ticker}...`)
    await sendBuySignal(tickers[i].ticker, tickers[i].interval)
    await sleep(20000)
  }

  // 15 minute delay if Email has already been sent
  if (emailSent) {
    console.log('⏰ 15 minute email cooldown...')
    await sleep(900000)
    emailSent = false
  }
}

async function startInterval() {
  console.log(`🎬 Starting up...`)
  await start()
  setIntervalAsync(async () => await start(), 20000)
}

startInterval()
