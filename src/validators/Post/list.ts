import { IPaginationParams } from "../../interfaces/Pagination";
import * as yup from "yup";
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

export function validate(data: IPaginationParams): Promise<IPaginationParams> {
  return schema.validate(data);
}
