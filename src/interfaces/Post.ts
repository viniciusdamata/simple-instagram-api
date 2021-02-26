export interface IPost {
  id?: number;
  author: string;
  place: string;
  description: string;
  hashtags: string;
  image?: Express.Multer.File;
  likes?: number;
}
