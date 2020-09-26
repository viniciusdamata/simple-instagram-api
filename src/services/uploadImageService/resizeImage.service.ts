import SharpService from "../external/sharp.service";

import { MulterFileInterface } from "../../interfaces/MulterFileInterface";

export interface ResizeImageInterface {
  resizeImageToFile(file: MulterFileInterface): Promise<void>;
  resizeImageToBuffer(file: Buffer): Promise<Buffer>;
}

class SharpResizeImageService implements ResizeImageInterface {
  async resizeImageToFile(file: MulterFileInterface): Promise<void> {
    const sharpService = new SharpService();
    return sharpService.resizeImageToFile(file);
  }

 async  resizeImageToBuffer(file: Buffer): Promise<Buffer> {
    const sharpService = new SharpService();
    return sharpService.resizeImageToBuffer(file);
  }
}

export const sharpResizeImageService = new SharpResizeImageService();
