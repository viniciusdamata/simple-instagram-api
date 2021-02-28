import { IPost } from "../../interfaces/Post";
import * as yup from "yup";
import { Validator } from "..";

const schema = yup.object<IPost & { [key: string]: any }>().shape({
  author: yup.string().required(),
  place: yup.string().required(),
  description: yup.string().required(),
  hashtags: yup.string().required(),
  image: yup.mixed().required(),
});

export const validator = new Validator<IPost>(schema)


