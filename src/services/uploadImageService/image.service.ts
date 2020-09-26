import { ResizeImageInterface } from "./resizeImage.service";
import { UploadImageInterface } from "./uploadImage.service";

class ImageService {
  resizeImageService: ResizeImageInterface;
  uploadImageService: UploadImageInterface;
  constructor(
    resizeImageService: ResizeImageInterface,
    uploadImageService: UploadImageInterface
  ) {
    this.resizeImageService = resizeImageService;
    this.uploadImageService = uploadImageService;
  }

  async resizeImageAndUpload(file: Express.Multer.File): Promise<string> {
    let image = "";

    if (process.env.ENV === "PROD") {
      const { buffer } = file;
      const resizedImage = await this.resizeImageService.resizeImageToBuffer(
        buffer
      );
      const imageCreatedImgur = await this.uploadImageService.uploadImage(
        resizedImage
      );
      const link = imageCreatedImgur.data.link;
      image = link;
    } else if (process.env.ENV === "DEV") {
      const { originalname, buffer } = file;
      await this.resizeImageService.resizeImageToFile({ originalname, buffer });
      image = `${process.env.BASE_URL}/files/${originalname}`;
    }
    return image;
  }
}

export default ImageService;
