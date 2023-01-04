const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempelateSchema = new Schema({
  templateNo: {
    type: Number,
  },
  templatesBody: {
    type: String,
  },
  Attachment: {
    type: String,
  },
  UnSubscribeLink: {
    type: Boolean,
  },
  SendType: {
    type: String,
  },
  PersonalisedAttachment: {
    type: String,
  },
  ButtonOption: {
    type: Boolean,
  },
  Header: {
    type: String,
  },
  Buttons: {
    type: Object,
  },
  Footer: {
    type: String,
  },
  ButtonPreview: {
    type: String,
  },
  Api: {
    type: String,
  },
});

const Tempelates = mongoose.model("Templates", tempelateSchema);

module.exports = Tempelates;
