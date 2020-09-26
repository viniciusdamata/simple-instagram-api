import ImgurService from "../external/imgur.service";

export interface UploadImageInterface {
  uploadImage(file: Buffer): Promise<any>;
}

class UploadImageToImgurService implements UploadImageInterface {
  async uploadImage(file: Buffer): Promise<any> {
    const imgurService = new ImgurService();
    return imgurService.createImgurPost(file);
  }
}

export const uploadImageImgurService = new UploadImageToImgurService();
