const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseUniqueValidation = require("mongoose-unique-validator");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  whatsappMobile: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  templateNo: {
    type: String,
  },
  SentReport: {
    type: String,
  },
});
contactSchema.plugin(mongooseUniqueValidation);

const Contacts = mongoose.model("Contacts", contactSchema);

module.exports = Contacts;
