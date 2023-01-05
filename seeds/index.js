const mongoose = require("mongoose");
const Contacts = require("../Models/contacts");
const Templates = require("../Models/templates");
const templateSeeds = require("./templateSeed");
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
      whatsappMobile: contactSeed.MobileNo,
      email: contactSeed.Sno + "testdata@gmail.com",
      templateNo: "",
      SentStatus: "S",
      SentReport: "Sent on 05:01:2023 11:52",
    });

    await newContact.save();
  }
  let newContact = new Contacts({
    name: "Dev",
    mobile: 9910513597,
    whatsappMobile: 9910513597,
    email: "3476testdata@gmail.com",
    templateNo: "2",
    SentStatus: "",
    SentReport: "",
  });
  await newContact.save();
};

const rootTemplates = async () => {
  for (let template of templateSeeds) {
    let newTemplate = new Templates(template);
    await newTemplate.save();
  }
};

rootContacts().then(() => {
  mongoose.connection.close();
});

// rootTemplates().then(() => {
//   mongoose.connection.close();
// });
