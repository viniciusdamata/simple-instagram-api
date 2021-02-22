// import {ImgurService} from "../external/imgur.service";
// import api from "../../config/axios.config"
import FormData from "form-data";
import { AxiosInstance } from "axios";
import { IUploadImage } from "../interfaces/uploadImage";

export class ImgurProvider implements IUploadImage<any> {
  constructor(private api: AxiosInstance, private formData: typeof FormData) {}

  async uploadImage(file: Buffer): Promise<any> {
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
