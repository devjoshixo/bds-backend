const mongoose = require("mongoose");
const Contacts = require("../Models/contacts");
const Templates = require("../Models/templates");
const templateSeeds = require("./templateSeed");
const contactSeeds = require("./contactSeed");
const contactinfo = require("./contacts");
const Schedules = require("../Models/schedules");
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

const rootSchedules = async () => {
  var time = 6;
  await Schedules.deleteMany({});
  for (let i = 0; i < 5; i++) {
    let newSchedule = new Schedules({
      date: new Date(Date.parse(`2023-01-07 18:0${time + i}:00`)),
      templateNo: "2",
      active: true,
      entry: new Date(),
      scheduledBy: "djoshi911@gmail.com",
    });
    await newSchedule.save();
  }
};

const rootContacts = async () => {
  console.log(contactSeeds.length + contactinfo.length);
  await Contacts.deleteMany({});
  for (let contactSeed of contactinfo.slice(0, 600)) {
    let newContact = new Contacts({
      name: contactSeed["name"],
      mobile: contactSeed["mobile"],
      whatsappMobile: contactSeed["mobile"],
      email: contactSeed["email"],
      templateNo: "2",
      SentStatus: "",
      SentReport: "",
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

// rootSchedules().then(() => {
//   mongoose.connection.close();
// });

// rootTemplates().then(() => {
//   mongoose.connection.close();
// });
