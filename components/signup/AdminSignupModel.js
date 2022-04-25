// in SignupModael.js we will define our schema of mongo DB data .

const mongoose = require("mongoose");

const adminSignupSchema = mongoose.Schema({
  password: { type: String },

  ID: { type: String },
});
const adminSignupModel = mongoose.model("adminSignup", adminSignupSchema);
module.exports =  adminSignupModel;
