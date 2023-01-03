const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseUniqueValidation = require("mongoose-unique-validator");

const userSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(mongooseUniqueValidation);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
