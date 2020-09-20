const imgurService = require("../services/imgur.service");
const sharpService = require("../services/sharp.service");

/**
 *
 * @param {{fieldname: String,
 *  originalname: String,
 *  encoding: String,
 *  mimetype: String,
 *  buffer: Buffer,
 *  size: Number}} file
 * 
 * @returns {Promise<String>}
 */
exports.uploadImage = async function (file) {
  let image = "";
  
  if (process.env.ENV == "PROD") {
    const { buffer } = file;
    const resizedImage = await sharpService.resizeImageToBuffer(buffer);
    const imageCreatedImgur = await imgurService.createImgurPost(resizedImage);
    const link = imageCreatedImgur.data.link;
    image = link;
  } else if (process.env.ENV == "DEV") {
    const { originalname, buffer } = file;
    sharpService.resizeImageToFile({ originalname, buffer });
    image = `${process.env.BASE_URL}/files/${originalname}`;
  }
  return image;
};
