import ImgurService from "../external/imgur.service";

export interface UploadImageInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadImage(file: Buffer): Promise<any>;
}

class UploadImageToImgurService implements UploadImageInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async uploadImage(file: Buffer): Promise<any> {
    const imgurService = new ImgurService();
    return imgurService.createImgurPost(file);
  }
}

export const uploadImageImgurService = new UploadImageToImgurService();
