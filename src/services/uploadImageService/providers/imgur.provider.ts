import FormData from "form-data";
import { AxiosInstance } from "axios";
import { IUploadImage } from "../interfaces/uploadImage";
import { IImgurResponse } from "../../../interfaces/ImgurResponse";

export class ImgurProvider implements IUploadImage<IImgurResponse> {
  constructor(private api: AxiosInstance, private formData: typeof FormData) {}

  async uploadImage(file: Buffer): Promise<IImgurResponse> {
    try {
      const form = new this.formData();
      form.append("image", file);

      const response = await this.api.post("/image", form, {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          ...form.getHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`[imgur.service] ${error.message}`);
    }
  }
}
