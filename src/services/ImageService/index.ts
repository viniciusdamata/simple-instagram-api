import formData from "form-data";
import api from "../../config/axios";
import { ImageService } from "./ImageService";
import { ImgurProvider } from "./providers/imgur.provider";
import { sharpProvider as sharpServiceProvider } from "./providers/sharp.provider";

const imgurServiceProvider = new ImgurProvider(api, formData);

export default new ImageService(sharpServiceProvider, imgurServiceProvider);
