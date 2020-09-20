const sharp = require("sharp");
const path = require("path");

module.exports = {
  /**
   * 
   * @param {Buffer} image 
   * @returns {Promise<Buffer>}
   */
  async resizeImageToBuffer(image) {
    const imageResized = await sharp(image)
      .resize(500)
      .jpeg({ quality: 70 })
      .toBuffer();

    return imageResized;
  },
  /**
   *
   * @param {{buffer:Buffer, originalname:String}}
   * @returns {void}
   */
  async resizeImageToFile({ buffer, originalname }) {
    await sharp(buffer)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(__dirname, "..", "..", "uploads", "resized", originalname)
      );
  },
};
