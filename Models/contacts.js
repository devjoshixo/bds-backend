const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseUniqueValidation = require("mongoose-unique-validator");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  whatsappMobile: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  ScheduleTag: {
    type: String,
  },
  templateNo: {
    type: String,
  },
  SentStatus: {
    type: String,
  },
  SentReport: {
    type: String,
  },
});
contactSchema.plugin(mongooseUniqueValidation);

const Contacts = mongoose.model("Contacts", contactSchema);

module.exports = Contacts;
