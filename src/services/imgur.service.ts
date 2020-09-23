import api from "../config/axios.config";
import FormData from "form-data";
import { AxiosResponse } from "axios";
// const FormData = require("form-data");

/**
 *
 * @param {Buffer} image
 */

class ImgurService {
  async createImgurPost(image: Buffer): Promise<AxiosResponse<any>["data"]> {
    try {
      const form = new FormData();
      form.append("image", image);

      const response = await api.post("/image", form, {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          ...form.getHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`[imgur.service] ${error.message}`);
    }
  }
}
export default new ImgurService();
