const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  date: {
    type: Date,
  },
  messageType: {
    type: String,
  },
  batchNumber: {
    type: String,
  },
  templateNumber: {
    type: Number,
  },
  active: {
    type: Boolean,
  },
  sendNow: {
    type: Boolean,
  },
  entry: {
    type: Date,
  },
  scheduledBy: {
    type: String,
  },
  numberInBatch: {
    type: Number,
  },
});

const Schedules = mongoose.model("Schedules", scheduleSchema);

module.exports = Schedules;
