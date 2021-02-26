import { FilterQuery } from "mongoose";
import { IPaginatedData, IPaginationParams } from "../interfaces/Pagination";
import { PostModel } from "../models/Post";
import { PostRepository } from "../repositories/post.repository";
import { ImageService } from "./uploadImageService/image.service";

export class PostService {
  constructor(private postRepository: PostRepository, imageService: ImageService) {}

  // async like(id: string): Promise<PostModel> {
  //   const post = await this.postRepository.findById(id);
  //   post.likes = post.likes += 1;
  //   return await this.postRepository.update(post);
  // }

  async list(
    query: FilterQuery<PostModel>,
    paginationParams: IPaginationParams
  ): Promise<IPaginatedData<PostModel>> {
    const total = await this.postRepository.count();
    const data = await this.postRepository.list(query, paginationParams);

    return { data, filters: { total, ...paginationParams } };
  }
}
