const multer = require("multer");
const ImgurStorage = require("@trevorblades/multer-storage-imgur");

const upload = multer({
  storage: ImgurStorage({
    clientId: process.env.IMGUR_CLIENT_ID,
  }),
});
module.exports = upload;
