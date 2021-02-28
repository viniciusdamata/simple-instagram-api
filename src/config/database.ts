import mongoose from "mongoose";
import { DB_URI } from ".";

export async function connect():Promise<void>{
    try {
        await mongoose.connect(
          DB_URI,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );
      } catch (error) {
        console.log("DatabaseError", error);
      }
}