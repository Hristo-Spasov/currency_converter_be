require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3001,
  EXCHANGE_RATE_API_KEY: process.env.EXCHANGE_RATE_API_KEY,
  BASE_CURRENCY: "USD",
  ALLOWED_CURRENCIES: ["USD", "EUR", "RUB", "BYN"],
};
