const mongoose = require("mongoose");
const Contacts = require("./Models/contacts");
const CustomFields = require("./Models/customfield");
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

const fixContcts = async () => {
  var fields = {};
  const customFields = await CustomFields.find({});
  for (let customField of customFields) {
    fields[customField.title] = "";
  }

  const contacts = await Contacts.find({});
  var i = 0;
  for (let contact of contacts) {
    i++;
    let newContact = { ...contact };
    newContact.CustomFields = fields;
    await Contacts.findByIdAndUpdate(contact._id, newContact);
    console.log("Updated: " + i);
  }
};

fixContcts().then(() => {
  mongoose.connection.close();
});
