var mongoose = require("mongoose");
var CardSchema = mongoose.Schema({
  vehicleType: {
    type: String,
  },
  startPlace: {
    type: String,
  },
  endPlace: {
    type: String,
  },
  startTime: {
    type: String,
  },
  travelDay: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
  id: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  cardDate: {
    type: String,
  },
  cardTime: {
    type: String,
  },
  cardStatus: {
    type: String,
  },
  userId: {
    type: String,
  },
  userVehicleNumber: {
    type: String,
  },
  travelCharges: {
    type: String,
  },
  heartAd: {
    type: String,
  },
  heartUser: {
    type: String,
  },

 
});

var WishlistModel = mongoose.model("wishlist", CardSchema);
module.exports = WishlistModel;
