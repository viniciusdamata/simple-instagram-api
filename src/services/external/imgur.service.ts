import api from "../../config/axios.config";
import FormData from "form-data";
import { AxiosResponse } from "axios";

/**
 *
 * @param {Buffer} image
 */

class ImgurService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line no-console
      console.error(`[imgur.service] ${error.message}`);
    }
  }
}
export default ImgurService;
