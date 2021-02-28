import { Router } from "express";
import {postController} from "../controllers";
import uploadLocal from "../config/uploadLocal";

const router = Router();

router.post(
  "/post",
  uploadLocal.single("image"),
  postController.store.bind(postController)
);
router.get("/post", postController.index.bind(postController));
router.put("/post/:id/like", postController.like.bind(postController));

export default router;
