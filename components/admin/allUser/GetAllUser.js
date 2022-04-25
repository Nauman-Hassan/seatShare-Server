const signupModel = require("../../signup/SignupModel")

module.exports.getAllUser = async (req, res) => {
    try {
      const getAllUser = await signupModel.find();
      let newGetAllUser = []
      getAllUser.map((item) => {
        newGetAllUser.push(
          {
            id: item?._id,
            name: item?.name,
            email: item?.email,
            mobile: item?.mobile,
            userStatus: item?.userStatus
          }
        );
      })
      res.status(202).json({ status: "success", message: "Get All Users Successfully", data: newGetAllUser, statusCode: 202 })
      return
    } catch (error) {
      res.status(400).json({ status: "success", message: { error }, statusCode: 400 })
      return
    }
  };




// delete user
  module.exports.deleteUser = async (req, res) => {
    if (!req.body?.id) {
        res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
        return
      } else {
        const { id } = req.body;
        const findUser = await signupModel.findById({ _id: id });
        if (!findUser) {
          res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
          return
        }
        
        const user = await signupModel.findByIdAndDelete({ _id: id });
        if (!user) {
          res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
          return
        }
        res.status(201).json({ status: "success", message: "user  Delete Successfully", statusCode: 201 })
        return
      }
    
  };




// temporaryBlock
  module.exports.temporaryBlok = async (req, res) => {
    if (!req.body?.id) {
      res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
      return
    } else {
      const { id } = req.body;
      const user = await signupModel.findByIdAndUpdate(id, {
        userStatus: "Temporary Block",
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
            name: success?.name,
            email: success?.email,
            mobile: success?.mobile,
            userStatus: success?.userStatus
        };
        res.status(201).json({ status: "success", data: data, message: "User Temporary Block Successfully", statusCode: 201 })
        return
      });
  
    }
  };



//    permanentBlock
  module.exports.permanentBlok = async (req, res) => {
    if (!req.body?.id) {
      res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
      return
    } else {
      const { id } = req.body;
      const user = await signupModel.findByIdAndUpdate(id, {
        userStatus: "Permanent Block",
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
            name: success?.name,
            email: success?.email,
            mobile: success?.mobile,
            userStatus: success?.userStatus
        };
        res.status(201).json({ status: "success", data: data, message: "User Permanent Block Successfully", statusCode: 201 })
        return
      });
  
    }
  };


    // block to active
  module.exports.blockToActive = async (req, res) => {
    if (!req.body?.id) {
      res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
      return
    } else {
      const { id } = req.body;
      const user = await signupModel.findByIdAndUpdate(id, {
        userStatus: "Active",
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
            name: success?.name,
            email: success?.email,
            mobile: success?.mobile,
            userStatus: success?.userStatus
        };
        res.status(201).json({ status: "success", data: data, message: "User Active Successfully", statusCode: 201 })
        return
      });
  
    }
  };