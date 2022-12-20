const express = require("express");
const path = require("path");
const app = express();
const port = 3000 || process.env.PORT;
const yahooStockAPI = require("yahoo-stock-api").default;
const yahoo = new yahooStockAPI();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// specific request
app.get("/getData", async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).send("Please provide a symbol");
  // set start date of 1 day ago
  const data = await yahoo.getSymbol({ symbol });

  res.send(data);
});

// get request
app.get("/getAll", async (req, res) => {
  const symbols = [
    "ABG",
    "A",
    "AA",
    "ABM",
    "ABR",
    "AACG",
    "AAIC",
    "AB",
    "ABBV",
    "ABC",
    "ABCB",
    "ABCL",
    "ABCM",
    "ABEO",
    "ABEV",
    "ABG",
    "ABGI",
    "ABIO",
    "ABM",
    "ABMD",
    "ABNB",
    "ABOS",
    "ABR",
    "ABSI",
    "ABST",
  ];

  const promises = symbols.map((symbol) => yahoo.getSymbol({ symbol }));
  const data = await Promise.all(promises);
  const result = data.map((item, idx) => {
    return {
      symbol: symbols[idx],
      ...item,
    };
  });
  return res.send(result);
});

app.get("/", (req, res) => {
  app.use(
    express.static(path.resolve(__dirname, "stock-api-project", "build"))
  );
  res.sendFile(
    path.resolve(__dirname, "stock-api-project", "build", "index.html")
  );
});

app.listen(port, () =>
  console.log(`Stock app listening on port http://localhost:${port} !`)
);
