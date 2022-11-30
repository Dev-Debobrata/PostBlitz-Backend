import { createReadStream } from "fs";
import { s3 } from "../utils/s3Config";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

export const fileUpload = (file: Express.Multer.File) => {
  const fileStream = createReadStream(file.path);

  const uploadParams = {
    Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
};

export const filesUpload = async (files: Array<Express.Multer.File>) => {
  const params = files.map((file) => {
    return {
      Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
      Body: file.buffer,
      Key: file.filename,
    };
  });

  const results = await Promise.all(
    params.map((param) => s3.upload(param).promise())
  );
  return results;
}; // Not been tested
