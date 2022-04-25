const { response } = require("express");
const signupModel = require("../signup/SignupModel");
const adminSignupModel = require("../signup/AdminSignupModel")
const bcrypt = require("bcryptjs");

// In controller we define our API logics.
// Here is a controller (signinUser)

module.exports.signinUser = async (req, res) => {
  //  Here we will check is given email is exist in our db or not?
  if (!req.body?.email) {
    res
      .status(400)
      .json({ status: "error", message: "Email Required", statusCode: 400 });
    return;
  } else if (!req.body?.password) {
    res.status(400).json({
      status: "error",
      message: "Password  Required",
      statusCode: 400,
    });
    return;
  } else {
    let userCheck = await signupModel.findOne({ email: req.body.email });
    
    if (userCheck) {
      //   check for user given password and db comming pasword
      let checkPass = await bcrypt.compare(
        req.body.password,
        userCheck.password
      );
      if (checkPass) {
        let data ={
          id: userCheck?._id,
          name: userCheck?.name,
          email: userCheck?.email,
          mobile: userCheck?.mobile,
          userStatus: userCheck?.userStatus

        }
        res.status(202).json({ status: "success", message: "User get successfully", data: data, statusCode: 202 })
      } else {
        res.status(403).send({ message: "User Password is Incorrect!" });
      }
    } else {
      res
        .status(403)
        .send({ message: "No User Is Registered With This E-mail!" });
    }
  }
};


module.exports.signinAdmin = async (req, res) => {
  //  Here we will check is given email is exist in our db or not?
  if (!req.body?.ID) {
    res
      .status(400)
      .json({ status: "error", message: "Admin ID Required", statusCode: 400 });
    return;
  } else if (!req.body?.password) {
    res.status(400).json({
      status: "error",
      message: "Admin Password  Required",
      statusCode: 400,
    });
    return;
  } else {
    let userCheck = await adminSignupModel.findOne({ ID: req.body.ID });

    if (userCheck) {
      //   check for user given password and db comming pasword
      let checkPass = await bcrypt.compare(
        req.body.password,
        userCheck.password
      );
      if (checkPass) {
        
        res
          .status(202)
          .json({
            status: "success",
            message: "Admin Login successfully",
            statusCode: 202,
          });
          
      } else {
        res.status(404).send({ message: "Admin Password is Incorrect!" });
      }
    } else {
      res
        .status(403)
        .send({ message: "No Admin Is Registered With This ID!" });
    }
  }
};
