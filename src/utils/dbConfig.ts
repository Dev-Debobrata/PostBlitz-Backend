import * as dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config({ path: __dirname + "/../.env" });

const mongoURL: String | undefined = process.env.MONGO_URL;

export const connectToDatabase = async () => {
  try {
    await connect(`${mongoURL}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
