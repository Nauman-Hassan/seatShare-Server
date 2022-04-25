const express = require("express");
const { addCard, deleteCard, permanentBlockCard, temporaryBlockCard, blockToActiveCard, getAllAds, myAds } = require("./AddCard");

const {uploadImage} = require("../../config/Multer");
const { adsCategories } = require("./CardCategories");
const { userWishlist } = require("./UserWishlist");
const adminRouter = express.Router();

// adminRouter.post("/addCard", uploadImage, (req, res) => {
//   console.log("hello card");
//   addCard(req, res);
// });
adminRouter.post("/addCard",  (req, res) => {
  console.log("hello card");
  addCard(req, res);
});

adminRouter.delete("/deleteCard", (req, res) => {
    deleteCard(req, res);
  });

  adminRouter.put("/permanentBlockCard",  (req, res) => {
    permanentBlockCard(req, res);
  });
  adminRouter.put("/temporaryBlockCard",  (req, res) => {
    temporaryBlockCard(req, res);
  });

  adminRouter.put("/blockToActiveCard",  (req, res) => {
    blockToActiveCard(req, res);
  });
  adminRouter.get("/allAds",  (req, res) => {
    console.log("user wishlist run... route");
    getAllAds(req, res)
  });
  adminRouter.post("/userAllAds", (req, res) => {
    myAds(req, res);
    
  });
  adminRouter.post("/adsCategories", (req, res) => {
    adsCategories(req, res)
    
  });
  adminRouter.get("/userWishlist", (req, res) => {
    console.log("user wishlist run... route");
    userWishlist(req, res);
    
  });
module.exports = adminRouter;