import { MulterFileInterface } from "../../../interfaces/MulterFileInterface";

export interface IResizeImage {
  resizeImageToFile(file: MulterFileInterface): Promise<string>;
  resizeImageToBuffer(file: Buffer): Promise<Buffer>;
}
