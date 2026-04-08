const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.KALSHI_API_KEY;

const COINS = ["BTC", "ETH", "SOL", "HYPE", "XRP", "BNB", "DOGE"];

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/markets", async (req, res) => {
  try {
    const results = [];

    for (let coin of COINS) {
      const response = await fetch(
        `https://api.elections.kalshi.com/trade-api/v2/markets?search=${coin}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const data = await response.json();
      const market = data.markets?.[0];

      if (!market) continue;

      const current = parseFloat(market.last_price || 0);
      const target = parseFloat(market.strike_price || 1);

      const percent = (((current - target) / target) * 100).toFixed(2);

      results.push({ coin, current, target, percent });
    }

    res.json(results);
  } catch (err) {
    res.status(500).send("Error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Running on port " + PORT));
