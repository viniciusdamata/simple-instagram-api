import { IPaginationParams } from "../../interfaces/Pagination";
import * as yup from "yup";
import { Validator } from "..";
import { IPost } from "src/interfaces/Post";

const schema = yup
  .object<IPaginationParams & IPost & { [key: string]: any }>()
  .shape({
    pageSize: yup.string().optional(),
    page: yup.string().optional(),
    author: yup.string().optional(),
    place: yup.string().optional(),
    description: yup.string().optional(),
    hashtags: yup.string().optional(),
  });

export const validator = new Validator<IPaginationParams>(schema);
