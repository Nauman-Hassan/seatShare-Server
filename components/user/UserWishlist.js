const WishlistModel = require("./WishlistModel")

module.exports.userWishlist = async (req, res) => {
console.log("user wishlist run...",req.body);
if (!req.body?.name) {
    res
      .status(400)
      .json({ status: "error", message: "User Name Required", statusCode: 400 });
    return;
  } else
  if (!req.body?.travelCharges) {
    res
      .status(400)
      .json({
        status: "error",
        message: "User Travel Charges Required",
        statusCode: 400,
      });
    return;
  } else if (!req.body?.userVehicleNumber) {
    res
      .status(400)
      .json({
        status: "error",
        message: "User Vehicle Number Required",
        statusCode: 400,
      });
    return;
  } else if (!req.body?.id) {
    res
      .status(400)
      .json({ status: "error", message: "User Id Required", statusCode: 400 });
    return;
  } else if (!req.body?.email) {
    res
      .status(400)
      .json({ status: "error", message: "Email Required", statusCode: 400 });
    return;
  } else if (!req.body?.vehicleType) {
    res
      .status(400)
      .json({
        status: "error",
        message: "Vehicle Type Required",
        statusCode: 400,
      });
    return;
  } else if (!req.body?.startPlace) {
    res
      .status(400)
      .json({
        status: "error",
        message: "Start Place Required",
        statusCode: 400,
      });
    return;
  } else if (!req.body?.endPlace) {
    res
      .status(400)
      .json({
        status: "error",
        message: "End Place Required",
        statusCode: 400,
      });
    return;
  } else if (!req.body?.startTime) {
    res.status(400).json({
      status: "error",
      message: "Start Time  Required",
      statusCode: 400,
    });
    return;
  } else if (!req.body?.travelDay) {
    res.status(400).json({
      status: "error",
      message: "Travel Day  Required",
      statusCode: 400,
    });
    return;
  } else  if (!req.body?.heartUser) {
    res.status(400).json({
      status: "error",
      message: "Heart User  Required",
      statusCode: 400,
    });
    return;
  } else if (!req.body?.description) {
    res.status(400).json({
      status: "error",
      message: "Description Required",
      statusCode: 400,
    });
    return;
  } else {
    console.log("all is well...");
    const {
      vehicleType,
      startPlace,
      endPlace,
      startTime,
      name,
      travelDay,
      description,
      email,
      userVehicleNumber,
      travelCharges,
      userId,
      cardStatus,
      cardDate,
      cardTime,
      heartUser,
    } = req.body;
    const newCard = new WishlistModel({
      vehicleType,
      startPlace,
      endPlace,
      startTime,
      name,
      travelDay,
      description,
      email,
      userVehicleNumber,
      travelCharges,
      userId,
      cardStatus,
      cardDate,
      cardTime,
      travelCharges,
      heartUser,
    });

// 
        newCard.save((err, success) => {
          console.log("Succ", success);
          if (err) {
            res
              .status(400)
              .json({
                status: "error",
                message: err?.message,
                statusCode: 400,
              });
            return;
          }
          let data = {
            id: success?._id,
            vehicleType: success?.vehicleType,
            startPlace: success?.startPlace,
            endPlace: success?.endPlace,
            startTime: success?.startTime,
            travelDay: success?.travelDay,
            description: success?.description,
            userId: success?.userId,
            cardDate: success?.cardDate,
            cardTime: success?.cardTime,
            cardStatus: success?.cardStatus,
            userVehicleNumber: success?.userVehicleNumber,
            travelCharges: success?.travelCharges,
            heartUser: success?.heartUser,
            name: success?.name,
          };
          console.log("Data res", data);
          res.status(201).json({
            status: "success",
            data: data,
            message: "Wishlist Card Successfully",
            statusCode: 201,
          });
          return;
        });
  }
}