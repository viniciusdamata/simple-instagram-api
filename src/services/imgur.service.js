const fs = require("fs");
const api = require("../config/axios.config");
const FormData = require("form-data");

module.exports = {
  /**
   *
   * @param {BinaryType} image
   */

  async createImgurPost(image) {
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
  },
};
