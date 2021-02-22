import { IUploadImage } from "./interfaces/uploadImage";
import { IResizeImage } from "./interfaces/resizeImage";

export class ImageService {
  resizeImageService: IResizeImage;
  uploadImageService: IUploadImage<any>;
  constructor(
    resizeImageService: IResizeImage,
    uploadImageService: IUploadImage<any>
  ) {
    this.resizeImageService = resizeImageService;
    this.uploadImageService = uploadImageService;
  }

  async resizeImageAndUpload(file: Express.Multer.File): Promise<string> {
    try {
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
        image = await this.resizeImageService.resizeImageToFile({
          originalname,
          buffer,
        });
      }
      return image;
    } catch (err) {
      console.log(err);
    }
  }
}
