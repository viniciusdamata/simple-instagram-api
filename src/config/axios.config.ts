import axios, {AxiosInstance} from "axios";

export {AxiosInstance};
export default axios.create({ baseURL: process.env.IMGUR_URL });
