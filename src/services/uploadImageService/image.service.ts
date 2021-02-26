import { IUploadImage } from "./interfaces/uploadImage";
import { IResizeImage } from "./interfaces/resizeImage";
import { IImgurResponse } from "../../interfaces/ImgurResponse";

export class ImageService {
  constructor(
    private resizeImageService: IResizeImage,
    private uploadImageService: IUploadImage<IImgurResponse>
  ) {}

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
