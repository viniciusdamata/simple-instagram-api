import ImageService from "./image.service";
import { sharpResizeImageService } from "./resizeImage.service";
import { uploadImageImgurService } from "./uploadImage.service";

export default new ImageService(
  sharpResizeImageService,
  uploadImageImgurService
);
