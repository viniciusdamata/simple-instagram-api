import { Model, FilterQuery } from "mongoose";
import { IPaginationParams } from "../interfaces/Pagination";
import { IPost } from "../interfaces/Post";
import { Post } from "../models/Post";

export class PostRepository {
  constructor(private Post: Model<Post>) {}

  async list(
    query: FilterQuery<Post>,
    paginationParams: IPaginationParams
  ): Promise<Post[]> {
    const skip =
      (parseInt(paginationParams.page) - 1) *
      parseInt(paginationParams.pageSize);
    const limit = parseInt(paginationParams.pageSize);

    return await this.Post.find({ ...query })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async insert(data: IPost): Promise<Post> {
    return await this.Post.create(data);
  }

  async update(data: Partial<IPost>): Promise<Post> {
    const { _id, ...model } = data;
    return await this.Post.findByIdAndUpdate(_id, model);
  }

  async findById(id: string): Promise<Post> {
    return await this.Post.findById(id);
  }

  async count(query?: FilterQuery<Post>): Promise<number> {
    return await this.Post.countDocuments(query);
  }
}
