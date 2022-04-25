// in SignupModael.js we will define our schema of mongo DB data .

const mongoose = require("mongoose");
const signupSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  confirmPassword: { type: String },

  mobile: {
    type: Number,
  },
  userStatus: {
    type: String,
  },
  ID: { type: String },
});
const signupModel = mongoose.model("userSignup", signupSchema);
module.exports = signupModel;
