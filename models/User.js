const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  uid: String,
  username: String,
  mail: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);