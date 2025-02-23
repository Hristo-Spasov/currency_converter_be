const axios = require("axios");
const config = require("../config/config");

let ratesCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 2000 * 60 * 60;

const getRates = async (currencies) => {
  const now = Date.now();

  if (!ratesCache || !lastFetchTime || now - lastFetchTime > CACHE_DURATION) {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${config.EXCHANGE_RATE_API_KEY}/latest/${config.BASE_CURRENCY}`
    );
    ratesCache = response.data.conversion_rates;
    lastFetchTime = now;
  }

  if (currencies?.length) {
    const requestedRates = {};
    currencies.forEach((currency) => {
      if (ratesCache[currency]) {
        requestedRates[currency] = ratesCache[currency];
      }
    });

    return requestedRates;
  }

  const filtered = filterRates(ratesCache);

  return filtered;
};

const getSupportedCurrencies = async () => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${config.EXCHANGE_RATE_API_KEY}/codes`
    );

    const currencyCodes = response.data.supported_codes.map(([code, name]) => ({
      code,
      name,
    }));
    return currencyCodes;
  } catch (error) {
    throw new Error("Failed to fetch supported currencies");
  }
};

const filterRates = (rates) => {
  const filteredRates = {};

  for (const currency in rates) {
    if (config.ALLOWED_CURRENCIES.includes(currency)) {
      filteredRates[currency] = rates[currency];
    }
  }
  return filteredRates;
};

const convertAmount = async (amount, fromCurrency, selectedCurrencies) => {
  const numAmount = parseFloat(amount) || 0;
  const rates = await getRates(selectedCurrencies);

  const valueInUSD =
    fromCurrency === "USD" ? numAmount : numAmount / rates[fromCurrency];

  const conversions = {};
  Object.entries(rates).forEach(([code, rate]) => {
    conversions[code] = valueInUSD * rate;
  });

  return conversions;
};

module.exports = {
  getRates,
  convertAmount,
  getSupportedCurrencies,
};
