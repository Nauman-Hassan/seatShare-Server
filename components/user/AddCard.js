const { response } = require("express");
const CardModel = require("./CardModel")
const signupModel = require("../signup/SignupModel")
const bcrypt = require("bcryptjs");
const cloudinary = require("../../config/Cloudninary");

// In controller we define our API logics.
// Here is a controller (signupUser)

module.exports.addCard = async (req, res) => {
  //  Here we will check is given email is exist in our db or not?
    // console.log("hello card", req.body?.userVehicleNumber);
    console.log("hello card add card");
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
  } else if (!req.body?.description) {
    res.status(400).json({
      status: "error",
      message: "Description Required",
      statusCode: 400,
    });
    return;
  } else {
    const checkUserStatus = await signupModel.findOne({ _id: req.body.id });
    console.log("checkUserStatus", checkUserStatus.userStatus);
    let checkUserStatusCondition = checkUserStatus.userStatus;
    if (checkUserStatusCondition === "Permanent Block") {
      console.log("Permanent block is running...", checkUserStatusCondition);
      res
        .status(400)
        .json({
          status: "error",
          message: "You are Permanent Block user",
          statusCode: 400,
        });
      return;
    } else if (checkUserStatusCondition === "Temporary Block") {
      console.log("Permanent block is running...", checkUserStatusCondition);

      res
        .status(400)
        .json({
          status: "error",
          message: "You are Temporary Block user",
          statusCode: 400,
        });
      return;
    }

    // const filename = req.file?.path ? await cloudinary.uploader.upload(req.file?.path, { folder: "User/Card/" }) : ""

    const {
      vehicleType,
      startPlace,
      endPlace,
      startTime,
      travelDay,
      description,
      email,
      id,
      name,
      userVehicleNumber,
      travelCharges,
    } = req.body;
    const newCard = new CardModel({
      vehicleType,
      startPlace,
      endPlace,
      startTime,
      travelDay,
      description,
      email,
      name,
      userVehicleNumber,
      travelCharges,
      userId: id,
      // image: filename?.secure_url,
      // cloudinaryId: filename?.public_id,
      cardStatus: "Active",
      cardDate: new Date().toISOString().split("T")[0],
      cardTime: new Date().toLocaleTimeString(),
    });
    console.log("newcard", newCard);
    newCard.save((err, success) => {
      console.log("Succ", success);
      if (err) {
        res
          .status(400)
          .json({ status: "error", message: err?.message, statusCode: 400 });
        return;
      }
      let data = {
        id: success?._id,
        name: success?.name,
        vehicleType: success?.vehicleType,
        startPlace: success?.startPlace,
        endPlace: success?.endPlace,
        startTime: success?.startTime,
        travelDay: success?.travelDay,
        description: success?.description,
        email: success?.email,
        userId: success?.userId,
        cardDate: success?.cardDate,
        cardTime: success?.cardTime,
        cardStatus: success?.cardStatus,
        userVehicleNumber: success?.userVehicleNumber,
        travelCharges: success?.travelCharges,
      };
      console.log("Data res", data);
      res
        .status(201)
        .json({
          status: "success",
          data: data,
          message: "Card Created Successfully",
          statusCode: 201,
        });
      return;
    });
  }
}




// delete card


module.exports.deleteCard = async (req, res) => {
    if (!req.body?.id) {
        res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
        return
      } else {
        const { id } = req.body;
        const findCard = await CardModel.findById({ _id: id });
        if (!findCard) {
          res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
          return
        }
        
        const card = await CardModel.findByIdAndDelete({ _id: id });
        if (!card) {
          res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
          return
        }
        res.status(201).json({ status: "success", message: "Card  Delete Successfully", statusCode: 201 })
        return
      }
    
  };


  //    permanentBlock
  module.exports.permanentBlockCard = async (req, res) => {
    if (!req.body?.id) {
      res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
      return
    } else {
      const { id } = req.body;
      const user = await CardModel.findByIdAndUpdate(id, {
        cardStatus: "Permanent Block",
      }, { new: true }
      )
      if (!user) {
        res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
        return
      }
      user.save((err, success) => {
        if (err) {
          res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
          return
        }
        let data = {
            id: success?._id,
          vehicleType:success?.vehicleType,
           startPlace:success?.startPlace, 
           endPlace:success?.endPlace, 
           startTime:success?.startTime, 
           travelDay:success?.travelDay, 
           description:success?.description,
           email:success?.email,
           userId:success?.userId,
           cardDate:success?.cardDate,
           cardTime:success?.cardTime,
           cardStatus:success?.cardStatus
        };
        res.status(201).json({ status: "success", data: data, message: "Card Permanent Blocked Successfully", statusCode: 201 })
        return
      });
  
    }
  };



  //    temporaryBlock
  module.exports.temporaryBlockCard = async (req, res) => {
    if (!req.body?.id) {
      res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
      return
    } else {
      const { id } = req.body;
      const user = await CardModel.findByIdAndUpdate(id, {
        cardStatus: "Temporary Block",
      }, { new: true }
      )
      if (!user) {
        res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
        return
      }
      user.save((err, success) => {
        if (err) {
          res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
          return
        }
        let data = {
            id: success?._id,
          vehicleType:success?.vehicleType,
           startPlace:success?.startPlace, 
           endPlace:success?.endPlace, 
           startTime:success?.startTime, 
           travelDay:success?.travelDay, 
           description:success?.description,
           email:success?.email,
           userId:success?.userId,
           cardDate:success?.cardDate,
           cardTime:success?.cardTime,
           cardStatus:success?.cardStatus
        };
        res.status(201).json({ status: "success", data: data, message: "Card Temporary Blocked Successfully", statusCode: 201 })
        return
      });
  
    }
  };



  //    temporaryBlock
  module.exports.blockToActiveCard = async (req, res) => {
    if (!req.body?.id) {
      res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
      return
    } else {
      const { id } = req.body;
      const user = await CardModel.findByIdAndUpdate(id, {
        cardStatus: "Active",
      }, { new: true }
      )
      if (!user) {
        res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
        return
      }
      user.save((err, success) => {
        if (err) {
          res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
          return
        }
        let data = {
            id: success?._id,
          vehicleType:success?.vehicleType,
           startPlace:success?.startPlace, 
           endPlace:success?.endPlace, 
           startTime:success?.startTime, 
           travelDay:success?.travelDay, 
           description:success?.description,
           email:success?.email,
           userId:success?.userId,
           cardDate:success?.cardDate,
           cardTime:success?.cardTime,
           cardStatus:success?.cardStatus
        };
        res.status(201).json({ status: "success", data: data, message: "Card Active Successfully", statusCode: 201 })
        return
      });
  
    }
  };



  module.exports.getAllAds = async (req, res) => {
    console.log("all ads");
    try {
      const getAllAds = await CardModel.find();
      console.log("all ads", getAllAds)
      let newGetAllAds = [];
      getAllAds.map((item) => {
        newGetAllAds.push({
          id: item?._id,
          name: item?.name,
          vehicleType: item?.vehicleType,
          startPlace: item?.startPlace,
          endPlace: item?.endPlace,
          startTime: item?.startTime,
          travelDay: item?.travelDay,
          description: item?.description,
          image: item?.image,
          cloudinaryId: item?.cloudinaryId,
          email: item?.email,
          cardDate: item?.cardDate,
          cardTime: item?.cardTime,
          cardStatus: item?.cardStatus,
          userId: item?.userId,
          userVehicleNumber: item?.userVehicleNumber,
          travelCharges: item?.travelCharges,

        });
      });
      res
        .status(202)
        .json({
          status: "success",
          message: "Get All Ads Successfully",
          data: newGetAllAds,
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



    


// user's ads Api

   module.exports.myAds = async (req, res) => {
     if (!req.body?.id) {
       res
         .status(400)
         .json({ status: "error", message: "id required", statusCode: 400 });
       return;
     } else {
       const { id } = req.body;
       try {
         const getUserAllAds = await CardModel.find({
           userId: id,
         });
         
         console.log("--==>>", getUserAllAds.length);
       

        res.status(202).json({
          status: "success",
          message: "Get All Ads Successfully",
          data: getUserAllAds,
          statusCode: 202,
        });

         return;
       } catch (error) {
         console.log("error",error);
         res.status(400).json({
           status: "error",
           message: { error },
           statusCode: 400,
         });
         return;
       }
     }
   };

