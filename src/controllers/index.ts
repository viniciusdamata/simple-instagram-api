import { PostRepository } from "../repositories/PostRepository";
import { PostService } from "../services/PostService";
import {PostController} from "./PostController";
import Post from "../models/Post";
import imageService from "../services/ImageService"


const postRepository = new PostRepository(Post)
const postService = new PostService(postRepository, imageService)
export const postController = new PostController(postService, postRepository);


