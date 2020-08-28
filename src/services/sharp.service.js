const sharp = require("sharp");
const path = require("path");

module.exports = {
  async resizeImageToBuffer(image) {
    const imageResized = await sharp(image)
      .resize(500)
      .jpeg({ quality: 70 })
      .toBuffer();

    return imageResized;
  },
  async resizeImageToFile(image) {
    const { buffer, originalname } = image;
    await sharp(buffer)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(__dirname, "..", "..", "uploads", "resized", originalname)
      );
  },
};
