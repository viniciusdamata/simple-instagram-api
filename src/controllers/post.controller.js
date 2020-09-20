const Post = require("../models/post.model");
const imageService = require("../services/image.service");

module.exports = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async index(req, res) {
    try {
      const posts = await Post.find({}).sort("-createdAt");
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async store(req, res) {
    try {
      const { author, place, description, hashtags } = req.body;

      const image = await imageService.uploadImage(req.file);

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
  },
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async like(req, res) {
    try {
      const _id = req.params.id;
      const post = await Post.findOne({ _id });
      post.likes = post.likes += 1;
      req.io.emit("like", post);
      await Post.updateOne({ _id }, post);
      res.status(200).json({ like: post });
    } catch (err) {
      res.status(404).json(err.message);
    }
  },
};
