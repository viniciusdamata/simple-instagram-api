import { Document, Schema, model} from "mongoose";
import { PostInterface } from "../interfaces/PostInterface";

export interface PostModel extends PostInterface, Document {}

const postSchema = new Schema<PostModel>(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      required: true,
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<PostModel>("Post", postSchema);
