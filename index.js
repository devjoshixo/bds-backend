const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Dashboard");
});

app.get("/contacts", (req,res) => {
  res.send("Contacts")
})

app.get("/schedule" , (req,res) => {
  res.send("Schedules")
})

app.get("/schedule/setup" , (req,res) => {
  res.send("Setup schedules")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
