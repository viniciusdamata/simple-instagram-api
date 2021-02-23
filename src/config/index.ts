
import path from "path";
export const IMAGES_PATH = path.resolve(__dirname, "..", "..", "uploads", "resized")
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
export const PORT = process.env.PORT || 3333;
export const HOST = "0.0.0.0";
export const URI = process.env.MONGO_DB_URI || "";
