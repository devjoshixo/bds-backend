const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@cluster0.nahrrro.mongodb.net/animalsDB`
  )
  .then(() => {
    console.log("Connected to mongodb database");
  })
  .catch((e) => {
    console.log(e);
  });

const schedules = require("./Routes/schedules");
const templates = require("./Routes/templates");

app.use("/schedules", schedules);
app.use("/templates", templates);

app.get("/", (req, res) => {
  console.log(kitty);
  res.send("HELLO");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
// developed by Chirag
