const Post = require("../models/post.model");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    try {
      const posts = await Post.find({}).sort("-createdAt");
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },
  async storeImgur(req, res) {
    try {
      const { author, place, description, hashtags } = req.body;
      const { link: image } = req.file.data;

      const post = new Post({
        author,
        place,
        description,
        hashtags,
        image,
      });

      const response = await post.save();
      req.io.emit("post", post);
      res.status(201).json({ criado: response });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const { author, place, description, hashtags } = req.body;
      const { filename: image } = req.file;
      const imageURL = `${process.env.BASE_URL}/files/${image}`;

      await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, "resized", image));

      fs.unlinkSync(req.file.path);

      const post = new Post({
        author,
        place,
        description,
        hashtags,
        image: imageURL,
      });

      const response = await post.save();
      req.io.emit("post", post);
      res.status(201).json({ criado: response });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
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
