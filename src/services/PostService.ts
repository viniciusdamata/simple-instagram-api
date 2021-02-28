import { FilterQuery } from "mongoose";
import { IPost } from "src/interfaces/Post";
import { IPaginatedData, IPaginationParams } from "../interfaces/Pagination";
import { Post } from "../models/Post";
import { PostRepository } from "../repositories/PostRepository";
import { ImageService } from "./ImageService/ImageService";

export class PostService {
  constructor(
    private postRepository: PostRepository,
    private imageService: ImageService
  ) {}

  async like(id: string): Promise<Post> {
    const post: any = await this.postRepository.findById(id);
    post.likes = post.likes + 1;
    return await this.postRepository.update(post as IPost);
  }

  async list(
    query: FilterQuery<Post>,
    paginationParams: IPaginationParams
  ): Promise<IPaginatedData<Post>> {
    const total = await this.postRepository.count();
    const data = await this.postRepository.list(query, paginationParams);

    return { data, filters: { total, ...paginationParams } };
  }

  async save(model: IPost): Promise<Post> {
    const image = await this.imageService.resizeImageAndUpload(
      model.image as Express.Multer.File
    );
    const data = { ...model, image };
    return await this.postRepository.insert(data);
  }
}
