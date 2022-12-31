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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  membership: {
    type: String,
    enum: ["Basic", "Silver", "Gold", "Platinum", "Diamond"],
    default: "Basic",
  },
});
contactSchema.plugin(mongooseUniqueValidation);

const Contacts = mongoose.model("Contacts", contactSchema);

module.exports = Contacts;
