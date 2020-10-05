import { Router } from "express";
import postController from "../controllers/post.controller";
const { index, store, like } = postController;
import postValidator from "../middlewares/post.validator";
import uploadLocal from "../config/upload.config.local";

const postRoute = Router();

postRoute.post(
  "/posts",
  uploadLocal.single("image"),
  postValidator.validate,
  store
);
postRoute.get("/posts", index);
postRoute.put("/posts/:id/like", like);

export default postRoute;
