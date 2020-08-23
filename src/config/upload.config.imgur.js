const multer = require("multer");
const dotenv = require("dotenv");
const ImgurStorage = require("@trevorblades/multer-storage-imgur");

dotenv.config();

const upload = multer({
  storage: ImgurStorage({
    clientId: process.env.IMGUR_CLIENT_ID,
  }),
});
module.exports = upload;
