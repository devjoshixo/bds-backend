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
    default: "",
  },
  templateNo: {
    type: String,
  },
  SentStatus: {
    type: String,
    default: "",
  },
  SentReport: {
    type: String,
    default: "",
  },
  CustomFields: {
    type: Object,
    default: null,
  },
});
contactSchema.plugin(mongooseUniqueValidation);

const Contacts = mongoose.model("Contacts", contactSchema);

module.exports = Contacts;
