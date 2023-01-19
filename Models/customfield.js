const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseUniqueValidation = require("mongoose-unique-validator");

const customFieldSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Text", "Date", "Select", "MultiSelect", "Number"],
      required: true,
    },
    createdOn: {
      type: String,
      required: true,
    },
  },
  { strict: false }
);
customFieldSchema.plugin(mongooseUniqueValidation);

const CustomFields = mongoose.model("customFields", customFieldSchema);

module.exports = CustomFields;
