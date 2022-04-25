const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
  cloud_name: 'seatshare', 
  api_key: '368963181162935', 
  api_secret: '9WuYk3_8U2yyoTB6UZtwoiGNUeA' 
}); 
module.exports = cloudinary;



