import { PostInterface } from "../interfaces/PostInterface";
import baseValidator from "./validator";

const entity: PostInterface = {
  author: "string",
  place: "string",
  description: "string",
  hashtags: "string",
};

class PostValidator extends baseValidator<PostInterface> {}

export default new PostValidator(entity);
