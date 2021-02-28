import axios, {AxiosInstance} from "axios";
import { IMGUR_URL } from ".";

export {AxiosInstance};
export default axios.create({ baseURL: IMGUR_URL });
