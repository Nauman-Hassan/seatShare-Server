const { response } = require("express");
const signupModel = require("./SignupModel");
const adminSignupModel = require("./AdminSignupModel")
const bcrypt = require("bcryptjs");
const cloudinary = require("../../config/Cloudninary");
const schedule = require("node-schedule");
const express = require("express");

const adminRouter = express.Router();
const {
 
  temporaryBlok,
 
} = require("../admin/allUser/GetAllUser");

// In controller we define our API logics.
// Here is a controller (signupUser)

module.exports.signupUser = async (req, res) => {
  //  Here we will check is given email is exist in our db or not?
  console.log("i am running...");
  if (!req.body?.name) {
    res
      .status(400)
      .json({ status: "error", message: "Name required", statusCode: 400 });
    return;
  } else if (!req.body?.email) {
    res
      .status(400)
      .json({ status: "error", message: "Email Required", statusCode: 400 });
    return;
  } else if (!req.body?.mobile) {
    res.status(400).json({
      status: "error",
      message: "Mobile Number  Required",
      statusCode: 400,
    });
    return;
  } else if (!req.body?.password) {
    res.status(400).json({
      status: "error",
      message: "Password  Required",
      statusCode: 400,
    });
    return;
  } else if (!req.body?.confirmPassword) {
    res.status(400).json({
      status: "error",
      message: "Confirm Password  Required",
      statusCode: 400,
    });
    return;
  } else if (req.body?.password !== req.body?.confirmPassword) {
    res.status(400).json({
      status: "error",
      message: "Password Not Matched",
      statusCode: 400,
    });
    return;
  } else {
  
    let userCheck = await signupModel.findOne({ email: req.body.email });
    if (userCheck) {
      
      res
        .status(200)
        .send({ result: userCheck, message: "Email Already Registered!" });
    } else {
      // Now we will encrypt the user password with the help of bcryptjs. 12 is security layers number

      let hashPass = await bcrypt.hash(req.body.password, 12);

      // Password Encode is complete

      // Signup db

      // Here we will pass our data to ensure the schema which we defined.
      const userCreate = new signupModel({
        name:req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashPass,
        userStatus:"Active"
      });
 
      // Here we will save our data in dataBase.
      try {
        userCreate.save((err, success) => {
          console.log("success", success);
          console.log("err", err);
          if (err) {
            res.send("err happen");
          }
          // res.send("User Registered successfully");
          res.status(200).send({
            result: success,
            message: "User Registered successfully!",
          });
          console.log("Id of reg user", success._id);
          schedule.scheduleJob("freeTrail","*/10 * * * * *", function () {
            success._id
            const freeTrailId = success._id
            console.log(
              "The answer to life, the universe, and everything!",
              freeTrailId
            );
              freeTrailEndFun(freeTrailId);
            // schedule.cancelJob("freeTrail");
          
          });
        });
      } catch (error) {
        // console.log("Error in saving data", error);
        res.status(400).send({
          result: error.message,
          message: "Oops! User not Registered successfully",
        });
      }

     
    }
  }
};





module.exports.signupAdmin = async (req, res) => {
  //  Here we will check is given email is exist in our db or not?
  console.log("i am running...");
  if (!req.body?.ID) {
    res
      .status(400)
      .json({ status: "error", message: "ID required", statusCode: 400 });
    return;
  } else if (!req.body?.password) {
    res.status(400).json({
      status: "error",
      message: "Password  Required",
      statusCode: 400,
    });
    return;
  } else {
    let userCheck = await adminSignupModel.findOne({ ID: req.body.ID });
    if (userCheck) {
      res
        .status(200)
        .send({ result: userCheck, message: "ID Already Registered!" });
    } else {
      // Now we will encrypt the user password with the help of bcryptjs. 12 is security layers number

      let hashPass = await bcrypt.hash(req.body.password, 12);

      // Password Encode is complete

      // Signup db

      // Here we will pass our data to ensure the schema which we defined.
      const userCreate = new adminSignupModel({
        ID: req.body.ID,
        password: hashPass,
      });

      // Here we will save our data in dataBase.
      try {
        userCreate.save((err, success) => {
          console.log("success", success);
          console.log("err", err);
          if (err) {
            res.send("err happen");
          }
          // res.send("User Registered successfully");
          res.status(200).send({
            result: success,
            message: "Admin Registered successfully!",
          });
        });
      } catch (error) {
        // console.log("Error in saving data", error);
        res.status(400).send({
          result: error.message,
          message: "Oops! Admin not Registered successfully",
        });
      }
    }
  }
};







freeTrailEndFun= async (_id)=> {
 
  try {
    console.log("fun run", _id);
   const freeTrail= await signupModel.findByIdAndUpdate(
      _id,
      {
        userStatus: "Free Trail End",
      },
      { new: true }
    );
    freeTrail.save((err, success) => {
      console.log("User status cahnged", success?.userStatus);
      if (err) {
        console.log("err in saving data", err);
      }
      
    });
  } catch (error) {
    console.log("error in fun run", error);
  }
    
    
};