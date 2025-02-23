const currencyService = require("../services/currency.services");

const getRates = async (req, res) => {
  try {
    const currencies = req.query.currencies?.split(",");

    const rates = await currencyService.getRates(currencies);

    res.json(rates);
  } catch (error) {
    console.error("Rates fetch error:", error);
    res.status(500).json({ error: error.message });
  }
};
const getSupportedCurrencies = async (req, res) => {
  try {
    const currencies = await currencyService.getSupportedCurrencies();
    res.json(currencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const convertCurrency = async (req, res) => {
  const { currency, amount, selectedCurrencies } = req.body;
  const conversions = await currencyService.convertAmount(
    amount,
    currency,
    selectedCurrencies
  );
  res.json(conversions);
};

module.exports = {
  getRates,
  convertCurrency,
  getSupportedCurrencies,
};
