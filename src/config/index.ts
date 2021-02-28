import path from "path";
export const IMAGES_PATH = path.resolve(
  __dirname,
  "..",
  "..",
  "uploads",
  "resized"
);
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
export const PORT = process.env.PORT || 3333;
export const HOST = "0.0.0.0";
export const DB_URI = process.env.MONGO_DB_URI || "";
export const ENV = process.env.ENV || "DEV";
export const IMGUR_URL = process.env.IMGUR_URL;
export const API_URL = process.env.API_URL;
export const APP_URL = process.env.APP_URL;
export const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
export const UPLOAD_TYPE = process.env.UPLOAD_TYPE || ENV === "production" ? "imgur" : "file";

console.table(this);
