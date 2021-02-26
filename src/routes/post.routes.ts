import { Router } from "express";
import postController from "../controllers";
import uploadLocal from "../config/upload.config.local";

const postRoute = Router();

postRoute.post(
  "/posts",
  uploadLocal.single("image"),
  postController.store.bind(postController)
);
postRoute.get("/posts", postController.index.bind(postController));
// postRoute.put("/posts/:id/like", postController.like);

export default postRoute;
