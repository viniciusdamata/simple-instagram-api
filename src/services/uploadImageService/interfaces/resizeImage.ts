import { IMulterFile } from "../../../interfaces/IMulterFile";

export interface IResizeImage {
  resizeImageToFile(file: IMulterFile): Promise<string>;
  resizeImageToBuffer(file: Buffer): Promise<Buffer>;
}
