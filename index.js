const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@cluster0.nahrrro.mongodb.net/multiWAScheduler`
  )
  .then(() => {
    console.log("Connected to mongodb database");
  })
  .catch((e) => {
    console.log(e);
  });

const schedules = require("./Routes/schedules");
const templates = require("./Routes/templates");
const contacts = require("./Routes/contacts");

app.use("/schedules", schedules);
app.use("/templates", templates);
app.use("/contacts", contacts);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
// developed by Chirag
