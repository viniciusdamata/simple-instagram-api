export interface IPost {
  _id?: string;
  author: string;
  place: string;
  description: string;
  hashtags: string;
  image?: string | Express.Multer.File;
  likes?: number;
}
