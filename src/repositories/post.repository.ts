import { Model } from "mongoose";
import { PostModel } from "src/models/Post";

export class PostRepository {
    constructor(private Post:Model<PostModel>){}

    async list(){
        return this.Post.find({})
    }
}