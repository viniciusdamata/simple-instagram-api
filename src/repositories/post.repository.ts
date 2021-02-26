import { Model, FilterQuery } from "mongoose";
import { IPaginationParams } from "../interfaces/Pagination";
import { IPost } from "../interfaces/Post";
import { PostModel } from "../models/Post";

export class PostRepository {
  constructor(private Post: Model<PostModel>) {}

  async list(
    query: FilterQuery<PostModel>,
    paginationParams: IPaginationParams
  ): Promise<PostModel[]> {
    const skip = (paginationParams.page - 1) * paginationParams.pageSize;
    const limit = paginationParams.pageSize;

    return await this.Post.find({ ...query })
      .skip(skip)
      .limit(limit);
  }

  async insert(data: IPost): Promise<PostModel> {
    return await this.Post.create(data);
  }

  // async update(data: Partial<IPost>): Promise<PostModel> {
  //   return await this.Post.findByIdAndUpdate(data._id, data);
  // }

  async findById(id: string): Promise<PostModel> {
    return await this.Post.findById(id);
  }

  async count(query?: FilterQuery<PostModel>):Promise<number> {
    return await this.Post.countDocuments(query);
  }
}
