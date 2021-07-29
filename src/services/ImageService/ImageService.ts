import { IUploadImage } from "./interfaces/uploadImage";
import { IResizeImage } from "./interfaces/resizeImage";
import { IImgurResponse } from "../../interfaces/ImgurResponse";
import { UPLOAD_TYPE } from "../../config/env";

export class ImageService {
  constructor(
    private resizeImageService: IResizeImage,
    private uploadImageService: IUploadImage<IImgurResponse>
  ) {}

  async resizeImageAndUpload(file: Express.Multer.File): Promise<string> {
    try {
      let image = "";
      if (UPLOAD_TYPE === "imgur") {
        const { buffer } = file;
        const resizedImage = await this.resizeImageService.resizeImageToBuffer(
          buffer
        );
        const imageCreatedImgur = await this.uploadImageService.uploadImage(
          resizedImage
        );
        const link = imageCreatedImgur.data.link;
        image = link;
      } else if (UPLOAD_TYPE === "file") {
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
