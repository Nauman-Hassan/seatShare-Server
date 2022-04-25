const express = require("express");
const { fetchTotalUser, fetchTotalTempUser, fetchTotalPermUser, fetchTotalActiveUser, fetchTotalAds, fetchTotalTempAds, fetchTotalPermAds, fetchTotalActiveAds } = require("./Dashboard");


const dashboardRouter = express.Router();

dashboardRouter.get("/fetchTotalUser", (req, res) => {
  fetchTotalUser(req, res);
});
dashboardRouter.get("/fetchTotalTempUser", (req, res) => {
  fetchTotalTempUser(req, res);
});
dashboardRouter.get("/fetchTotalPermUser", (req, res) => {
  fetchTotalPermUser(req, res);
});
dashboardRouter.get("/fetchTotalActiveUser", (req, res) => {
  fetchTotalActiveUser(req, res);
});


dashboardRouter.get("/fetchTotalAds", (req, res) => {
  fetchTotalAds(req, res);
});
dashboardRouter.get("/fetchTotalTempAds", (req, res) => {
  fetchTotalTempAds(req, res);
});
dashboardRouter.get("/fetchTotalPermAds", (req, res) => {
  fetchTotalPermAds(req, res);
});
dashboardRouter.get("/fetchTotalActiveAds", (req, res) => {
  fetchTotalActiveAds(req, res);
});



module.exports = dashboardRouter;