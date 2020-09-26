import sharp from "sharp";
import path from "path";
import { MulterFileInterface } from "../../interfaces/MulterFileInterface";

class SharpService {
  async resizeImageToBuffer(image: Buffer): Promise<Buffer> {
    const imageResized = await sharp(image)
      .resize(500)
      .jpeg({ quality: 70 })
      .toBuffer();

    return imageResized;
  }

  async resizeImageToFile(file: MulterFileInterface): Promise<void> {
    const { buffer, originalname } = file;
    await sharp(buffer)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(__dirname, "..", "..", "..", "uploads", "resized", originalname)
      );
  }
}

export default SharpService;
