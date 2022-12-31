const mongoose = require("mongoose");
const Contacts = require("../Models/contacts");
const contactSeeds = require("./contactSeed");
require("dotenv").config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@cluster0.nahrrro.mongodb.net/multiWAScheduler`
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((e) => {
    console.log("Not connecting to Database");
  });

const rootContacts = async () => {
  await Contacts.deleteMany({});
  for (let contactSeed of contactSeeds) {
    let newContact = new Contacts({
      name: contactSeed.Name,
      mobile: contactSeed.MobileNo,
      email: contactSeed.email,
    });
    await newContact.save();
  }
};

rootContacts().then(() => {
  mongoose.connection.close();
});
