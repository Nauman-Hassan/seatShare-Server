const signupModel = require("../../signup/SignupModel");
const CardModel = require("../../user/CardModel");

module.exports.fetchTotalUser = async (req, res) => {
  try {
    const getAllUser = await signupModel.find();
    const totalUser = getAllUser.length
    console.log("total user leng", totalUser);
    res
      .status(202)
      .json({
        status: "success",
        message: "Get All Users Successfully",
        data: totalUser,
        statusCode: 202,
      });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};
module.exports.fetchTotalTempUser = async (req, res) => {
  try {
    const getAllUser = await signupModel.find({userStatus : "Temporary Block"});
    const totalUser = getAllUser.length
    console.log("total user leng", totalUser);
    res
      .status(202)
      .json({
        status: "success",
        message: "Get All Temp Block Users Successfully",
        data: totalUser,
        statusCode: 202,
      });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};
module.exports.fetchTotalPermUser = async (req, res) => {
  try {
    const getAllUser = await signupModel.find({userStatus : "Permanent Block"});
    const totalUser = getAllUser.length
    console.log("total user leng", totalUser);
    res
      .status(202)
      .json({
        status: "success",
        message: "Get All Perm Block Users Successfully",
        data: totalUser,
        statusCode: 202,
      });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};
module.exports.fetchTotalActiveUser = async (req, res) => {
  try {
    const getAllUser = await signupModel.find({userStatus : "Active"});
    const totalUser = getAllUser.length
    console.log("total user leng", totalUser);
    res
      .status(202)
      .json({
        status: "success",
        message: "Get All Active Users Successfully",
        data: totalUser,
        statusCode: 202,
      });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};







module.exports.fetchTotalAds = async (req, res) => {
  try {
    const getAllUser = await CardModel.find();
    const totalUser = getAllUser.length;
    console.log("total user leng", totalUser);
    res.status(202).json({
      status: "success",
      message: "Get All Ads Successfully",
      data: totalUser,
      statusCode: 202,
    });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};
module.exports.fetchTotalTempAds = async (req, res) => {
  try {
    const getAllUser = await CardModel.find({
      cardStatus:"Temporary Block",
    });

    console.log("temp ads====>>", getAllUser);
    const totalUser = getAllUser.length;
    console.log("total user leng", totalUser);
    res.status(202).json({
      status: "success",
      message: "Get All Temp Block Ads Successfully",
      data: totalUser,
      statusCode: 202,
    });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};
module.exports.fetchTotalPermAds = async (req, res) => {
  try {
    const getAllUser = await CardModel.find({
      cardStatus:"Permanent Block",
    });


    console.log("perm ads====>>", getAllUser);
    const totalUser = getAllUser.length;
    console.log("total user leng", totalUser);
    res.status(202).json({
      status: "success",
      message: "Get All Perm Block Ads Successfully",
      data: totalUser,
      statusCode: 202,
    });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};
module.exports.fetchTotalActiveAds = async (req, res) => {
  try {
    const getAllUser = await CardModel.find({ cardStatus: "Active" });
    const totalUser = getAllUser.length;
    console.log("total user leng", totalUser);
    res.status(202).json({
      status: "success",
      message: "Get All Active Users Successfully",
      data: totalUser,
      statusCode: 202,
    });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: { error }, statusCode: 400 });
    return;
  }
};
