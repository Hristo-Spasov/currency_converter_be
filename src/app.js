const express = require("express");
const cors = require("cors");
const currencyRoutes = require("./routes/currency.routes");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

app.use(
  helmet(
    helmet({
      contentSecurityPolicy: false,
      referrerPolicy: { policy: "no-referrer" },
    })
  )
);
app.disable("x-powered-by");

app.use(
  cors({
    origin: "https://currency-converter-softteco.netlify.app",
    methods: ["GET", "POST"],
  })
);
app.use(limiter);
app.use(express.static("public", { dotfiles: "deny" }));
app.use((req, res, next) => {
  if (!req.secure) return res.redirect("https://" + req.headers.host + req.url);
  next();
});
app.use(express.json());

app.use("/api/currency", currencyRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
