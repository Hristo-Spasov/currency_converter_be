const express = require("express");
const cors = require("cors");
const currencyRoutes = require("./routes/currency.routes");
// comment
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/currency", currencyRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
