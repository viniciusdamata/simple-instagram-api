import { PostRepository } from "../repositories/post.repository";
import { PostService } from "../services/post.service";
import {PostController} from "./post.controller";
import Post from "../models/Post";


const postRepository = new PostRepository(Post)
const postService = new PostService(postRepository)
const postController = new PostController(postService, postRepository);

export default postController;
