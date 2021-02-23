import mongoose from "mongoose";
import { URI } from ".";

export async function connect():Promise<void>{
    try {
        await mongoose.connect(
          URI,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );
      } catch (error) {
        console.log("DatabaseError", error);
      }
}