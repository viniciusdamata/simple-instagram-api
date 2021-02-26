import Post from "../models/Post";
import imageService from "../services/uploadImageService/index";
import { Request, Response } from "express";
import { PostService } from "../services/post.service";
import { PostRepository } from "../repositories/post.repository";
import {validator as postValidator} from "../validators/Post/create";

export class PostController {
  constructor(
    private postService: PostService,
    private postRepository: PostRepository
  ) {}
  async index(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req;
      const { pageSize, page, ...searchQuery } = query;

      const data = await this.postService.list(searchQuery, {
        page: parseInt(page as string),
        pageSize: parseInt(pageSize as string),
      });

      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async store(req: Request, res: Response): Promise<void> {
    try {

      const data  = await postValidator.validate({ ...req.body, image: req.file });
      const image = await imageService.resizeImageAndUpload(req.file);

      const post = await Post.create({...data, image});

      req.io.emit("post", post);
      res.status(201).json({ data: post });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // async like(req: Request, res: Response): Promise<void> {
  //   try {
  //     const _id = req.params.id;
  //     const post = await Post.findOne({ _id });
  //     post.likes = post.likes += 1;
  //     req.io.emit("like", post);
  //     await Post.updateOne({ _id }, post);
  //     res.status(200).json({ liked: post });
  //   } catch (err) {
  //     res.status(404).json(err.message);
  //   }
  // }
}
