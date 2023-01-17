const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customFieldSchema = new Schema({
  title: {
    type: String,
    required: true,
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
});

const CustomFields = mongoose.model("customFields", customFieldSchema);

module.exports = CustomFields;
