import { MulterFileInterface } from "../../../interfaces/MulterFileInterface";
import { IResizeImage } from "../interfaces/resizeImage";
import sharp from "sharp";
import { IMAGES_PATH } from "../../../config";
import fs from "fs/promises";

class SharpProvider implements IResizeImage {
  async resizeImageToBuffer(image: Buffer): Promise<Buffer> {
    const imageResized = await sharp(image)
      .resize(500)
      .jpeg({ quality: 70 })
      .toBuffer();

    return imageResized;
  }

  async resizeImageToFile(file: MulterFileInterface): Promise<string> {
    const { buffer, originalname } = file;
    const [, ext] = originalname.split(".");
    const newFileName = `${Date.now()}.${ext}`
    const imagePath  = `${IMAGES_PATH}/${newFileName}`
    fs.access(IMAGES_PATH)
      .then(async () => {
        await sharp(buffer)
          .resize(500)
          .jpeg({ quality: 70 })
          .toFile(imagePath);
      })
      .catch(async error => {
        if (error.code === "ENOENT") {
          fs.mkdir(IMAGES_PATH, { recursive: true })
            .then(async () => await this.resizeImageToFile(file))
            .catch(error => console.log({ error }));
        }
      });

      return newFileName;
  }
}

export const sharpProvider = new SharpProvider();
