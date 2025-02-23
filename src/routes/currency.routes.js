const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currency.controller");

router.get("/rates", currencyController.getRates);
router.get("/codes", currencyController.getSupportedCurrencies);
router.post("/convert", currencyController.convertCurrency);

module.exports = router;
