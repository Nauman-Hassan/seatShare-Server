const express = require("express");
const sigupRouter = express.Router();

let {uploadImage} = require("../../config/Multer")
const { signupUser, signupAdmin } = require("./SignupController");

// Here we define the route of signup.

sigupRouter.post("/signup", (req, res) => {
  signupUser(req, res);
});
sigupRouter.post("/signup/admin", (req, res) => {
  console.log("signup admin router ...");
  signupAdmin(req, res);
});

module.exports = sigupRouter;