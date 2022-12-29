const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Dashboard");
});

app.get("/contacts", (req,res) => {
  res.send("Contacts")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
