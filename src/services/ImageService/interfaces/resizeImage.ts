import { IMulterFile } from "../../../interfaces/MulterFile";

export interface IResizeImage {
  resizeImageToFile(file: IMulterFile): Promise<string>;
  resizeImageToBuffer(file: Buffer): Promise<Buffer>;
}
