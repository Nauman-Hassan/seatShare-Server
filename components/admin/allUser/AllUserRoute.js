const express = require("express");
const { getAllUser, deleteUser, temporaryBlok, permanentBlok, blockToActive } = require("./GetAllUser");
const adminRouter = express.Router();

adminRouter.get("/getAllUser", (req, res) => {
  getAllUser(req, res);
});

adminRouter.delete("/deletelUser", (req, res) => {
  deleteUser(req, res);
});

adminRouter.put("/temporaryBlockUser", (req, res) => {
  temporaryBlok(req, res);
});
adminRouter.put("/permanentBlockUser", (req, res) => {
    permanentBlok(req, res);
  });

  adminRouter.put("/blockToActive", (req, res) => {
    blockToActive(req, res);
  });

module.exports = adminRouter;
