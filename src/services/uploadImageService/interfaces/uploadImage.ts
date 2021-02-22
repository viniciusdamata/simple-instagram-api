export interface IUploadImage<T> {
  uploadImage(file: Buffer): Promise<T>;
}
