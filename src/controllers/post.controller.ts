import Post from "../models/Post";
import imageService from "../services/uploadImageService/index";
import { Request, Response } from "express";

class PostController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req;
      const { page, pageSize } = query;
      console.log(
        (parseInt(page as string) - 1) * parseInt(pageSize as string)
      );
      console.log(parseInt(pageSize as string));
      const posts = await Post.find({ ...query })
        .sort("-createdAt")
        .skip((parseInt(page as string) - 1) * parseInt(pageSize as string))
        .limit(parseInt(pageSize as string));

      // .skip((parseInt(pagina) - 1) * parseInt(limite))
      // .limit(parseInt(limite));
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async store(req: Request, res: Response): Promise<void> {
    try {
      const { author, place, description, hashtags } = req.body;

      const image = await imageService.resizeImageAndUpload(req.file);

      const post = await Post.create({
        author,
        place,
        description,
        hashtags,
        image,
      });

      req.io.emit("post", post);
      res.status(201).json({ criado: post });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async like(req: Request, res: Response): Promise<void> {
    try {
      const _id = req.params.id;
      const post = await Post.findOne({ _id });
      post.likes = post.likes += 1;
      req.io.emit("like", post);
      await Post.updateOne({ _id }, post);
      res.status(200).json({ liked: post });
    } catch (err) {
      res.status(404).json(err.message);
    }
  }
}

export default new PostController();
