const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const app = express();


app.get("/", (req, res) => {
  res.send("Dashboard");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
