import { Document, Schema, model } from "mongoose";
import { API_URL } from "../config";
import { IPost } from "../interfaces/Post";

export type Post = Document<IPost>

const postSchema = new Schema<Post>(
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
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        if (ret.image && !ret.image.includes("https")) {
          const image = `${API_URL}/files/${ret.image}`;
          return { ...ret, image };
        }
      },
    },
  }
);

export default model<Post>("Post", postSchema);
