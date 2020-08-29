const Post = require("../models/post.model");

const imgurService = require("../services/imgur.service");
const sharpService = require("../services/sharp.service");

module.exports = {
  async index(req, res) {
    try {
      const posts = await Post.find({}).sort("-createdAt");
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const { author, place, description, hashtags } = req.body;

      let image = "";
      if (process.env.ENV == "PROD") {
        const { buffer } = req.file;
        const resizedImage = await sharpService.resizeImageToBuffer(buffer);
        const imageCreatedImgur = await imgurService.createImgurPost(
          resizedImage
        );
        const link = imageCreatedImgur.data.link;
        image = link;
      } else if (process.env.ENV == "DEV") {
        const { originalname, buffer } = req.file;
        sharpService.resizeImageToFile({ originalname, buffer });
        image = `${process.env.BASE_URL}/files/${originalname}`;
      }

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
