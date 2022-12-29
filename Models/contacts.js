const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  serialNumber: {
    type: Number,
  },
  name: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
  },
});

const Contacts = mongoose.model("Contacts", contactSchema);

module.exports = Contacts;
