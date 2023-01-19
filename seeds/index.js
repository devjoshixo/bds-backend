const mongoose = require("mongoose");
const Contacts = require("../Models/contacts");
const Templates = require("../Models/templates");
const CustomFields = require("../Models/customfield");
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
  await Schedules.deleteMany({});

  let newSchedule = new Schedules({
    date: new Date(Date.parse(`2023-01-12 12:23:00`)),
    templateNo: "2",
    active: true,
    entry: new Date(),
    scheduledBy: "djoshi911@gmail.com",
  });
  await newSchedule.save();
};

const rootContacts = async () => {
  await Contacts.deleteMany({});
  // let newContact = new Contacts({
  //   name: "Dev",
  //   mobile: 9910513597,
  //   whatsappMobile: 9910513597,
  //   email: "3476testdata@gmail.com",
  //   templateNo: "2",
  //   ScheduleTag: "Testing",
  //   SentStatus: "",
  //   SentReport: "",
  // });
  // await newContact.save();
  var numb = 0;
  var num = 1;
  for (let contactSeed of contactinfo.slice(0, 10)) {
    if (numb == 100) {
      num = 2;
    } else {
      numb++;
    }
    let newContact = new Contacts({
      name: contactSeed["name"],
      mobile: contactSeed["mobile"],
      whatsappMobile: contactSeed["mobile"],
      email: contactSeed["email"],
      templateNo: "2",
      ScheduleTag: `Testing${num}`,
      SentStatus: "",
      SentReport: "",
      CustomField: {},
    });

    await newContact.save();
    await Contacts.deleteMany({});
  }
};

const rootTemplates = async () => {
  for (let template of templateSeeds) {
    let newTemplate = new Templates(template);
    await newTemplate.save();
  }
};

const rootCustom = async () => {
  await CustomFields.deleteMany({});
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var date = new Date();
  var date =
    date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
  for (let i = 1; i <= 100; i++) {
    const newCustomField = new CustomFields({
      title: "Dev" + i,
      description: "Schedule Tag",
      type: "Text",
      createdOn: date,
    });
    await newCustomField.save();
  }
};

// rootCustom().then(() => {
//   mongoose.connection.close();
// });

rootContacts().then(() => {
  mongoose.connection.close();
});

// rootSchedules().then(() => {
// mongoose.connection.close();
// });

// rootTemplates().then(() => {
// mongoose.connection.close();
// });
