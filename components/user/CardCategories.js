const CardModel = require("./CardModel")


 module.exports.adsCategories = async (req, res) => {
    //  console.log(req.body?.vehicleType);
     if (!req.body?.vehicleType) {
       res
         .status(400)
         .json({
           status: "error",
           message: "Vehicle Type required",
           statusCode: 400,
         });
       return;
     } else {
       const { vehicleType1 } = req.body;
       try {
         const getAllAdsCategories = await CardModel.find({
           vehicleType: req.body?.vehicleType,
         });


         console.log("--==>> from req", req.body?.vehicleType);
         console.log("--==>>", getAllAdsCategories.length);

         res.status(202).json({
           status: "success",
           message: "Get All Ads Categories Successfully",
           data: getAllAdsCategories,
           statusCode: 202,
         });

         return;
       } catch (error) {
         console.log("error", error);
         res.status(400).json({
           status: "error",
           message: { error },
           statusCode: 400,
         });
         return;
       }
     }
   };;

   