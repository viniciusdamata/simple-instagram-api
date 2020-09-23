import { Router } from "express";
import postRoute from "./post.routes";

const router = Router();
router.use("/api", postRoute);

export default router;
