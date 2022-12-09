import * as dotenv from "dotenv";
import { ServerApiVersion } from "mongodb";
import { connect, ConnectOptions } from "mongoose";

dotenv.config({ path: __dirname + "/../.env" });

const mongoURL: String | undefined = process.env.MONGO_URL;

export const connectToDatabase = async () => {
  try {
    await connect(`${mongoURL}`, <ConnectOptions>{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
