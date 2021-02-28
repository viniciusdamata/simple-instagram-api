import { Router } from "express";
import postRoute from "./post";

const router = Router();
router.use("/api", postRoute);

export default router;
