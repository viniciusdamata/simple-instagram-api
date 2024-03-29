import { Request, Response } from "express";
import { IPaginationParams } from "src/interfaces/Pagination";
import { PostRepository } from "../repositories/PostRepository";
import { PostService } from "../services/PostService";
import postCreateValidator from "../validators/Post/create";
import postListValidator from "../validators/Post/list";

export class PostController {
  constructor(
    private postService: PostService,
    private postRepository: PostRepository
  ) {}
  async index(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req;
      const {
        pageSize,
        page,
        ...searchQuery
      } = await postListValidator.validate(
        (query as unknown) as IPaginationParams
      );

      const data = await this.postService.list(searchQuery, {
        page: page,
        pageSize: pageSize,
      });

      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async store(req: Request, res: Response): Promise<void> {
    try {
      const data = await postCreateValidator.validate({
        ...req.body,
        image: req.file,
      });

      const post = await this.postService.save({
        ...data,
      });

      req.io.emit("post", post);
      res.status(201).json({ data: post });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async like(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const post = await this.postService.like(id);
      req.io.emit("like", post);

      res.status(200).json({ data: post });
    } catch (err) {
      res.status(404).json(err.message);
    }
  }
}
