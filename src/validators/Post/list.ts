import { IPost } from "src/interfaces/Post";
import * as yup from "yup";
import { ObjectShape } from "yup/lib/object";
import { IPaginationParams } from "../../interfaces/Pagination";
import BaseValidator from "../base";

class PostList extends BaseValidator {
  private schema = yup.object<IPaginationParams & IPost & ObjectShape>().shape({
    pageSize: yup.string().optional(),
    page: yup.string().optional(),
    author: yup.string().optional(),
    place: yup.string().optional(),
    description: yup.string().optional(),
    hashtags: yup.string().optional(),
  });
  public validate<IPost>(
    data: IPost
  ): Promise<IPaginationParams & IPost & ObjectShape> {
    return this.schema.validate(data) as Promise<
      IPaginationParams & IPost & ObjectShape
    >;
  }
}
const postListValidator = new PostList();
export default postListValidator;
