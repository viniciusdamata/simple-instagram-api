import { Document, Schema, model } from "mongoose";
import { IPost } from "../interfaces/Post";

export interface PostModel extends IPost, Document {}

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
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        if (process.env.ENV === "DEV" && !ret.image.includes("https")) {
          const image = `${process.env.API_URL}/files/${ret.image}`;
          return { ...ret, image };
        }
      },
    },
  }
);

export default model<PostModel>("Post", postSchema);
