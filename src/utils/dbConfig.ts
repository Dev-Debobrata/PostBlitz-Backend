import * as dotenv from "dotenv";
import { ServerApiVersion } from "mongodb";
import { connect, ConnectOptions } from "mongoose";
import { logger } from "./logger";

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
    logger.info({
      message: `Mongo client: Unexpected error on idle client`,
      extra: error,
    });
  
    process.exit(1);
  }
};

