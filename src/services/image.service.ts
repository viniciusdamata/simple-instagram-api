import imgurService from "./imgur.service";
import sharpService from "./sharp.service";

export const uploadImage = async (
  file: Express.Multer.File
): Promise<string> => {
  let image = "";

  if (process.env.ENV === "PROD") {
    const { buffer } = file;
    const resizedImage = await sharpService.resizeImageToBuffer(buffer);
    const imageCreatedImgur = await imgurService.createImgurPost(resizedImage);
    const link = imageCreatedImgur.data.link;
    image = link;
  } else if (process.env.ENV === "DEV") {
    const { originalname, buffer } = file;
    sharpService.resizeImageToFile({ originalname, buffer });
    image = `${process.env.BASE_URL}/files/${originalname}`;
  }
  return image;
};
