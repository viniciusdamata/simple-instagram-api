import * as yup from "yup";
import { ObjectShape } from "yup/lib/object";
import { IPost } from "../../interfaces/Post";
import BaseValidator from "../base";

class PostCreate extends BaseValidator {
  private schema = yup.object<IPost & ObjectShape>().shape({
    author: yup.string().required(),
    place: yup.string().required(),
    description: yup.string().required(),
    hashtags: yup.string().required(),
    image: yup.mixed().required(),
  });
  public validate<IPost>(data: IPost): Promise<IPost> {
    return this.schema.validate(data) as Promise<IPost>;
  }
}

const postCreateValidator = new PostCreate();
export default postCreateValidator;
