const express = require("express");
const siginRouter = express.Router();

const { signinUser, signinAdmin } = require("./SigninController");

// Here we define the route of signin.

siginRouter.post("/signin", (req, res) => {
  signinUser(req, res);
});
siginRouter.post("/signin/admin", (req, res) => {
  signinAdmin(req, res);
});

module.exports = siginRouter;
