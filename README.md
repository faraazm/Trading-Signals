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

This application uses SendGrid for sending Email alerts. We are going with Email alerts because sending alerts via SMS becomes expensive over time.
