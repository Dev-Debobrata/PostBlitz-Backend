import { Request } from "express";
import multer, { diskStorage } from "multer";
import * as dotenv from "dotenv";
import multerS3 from "multer-s3";
import { v4 } from "uuid";
import { s3 } from "../utils/s3Config";
dotenv.config({ path: __dirname + "/../.env" });

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const dpStorage = diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, "./src/uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    const { originalname } = file;
    cb(null, `${v4()}-${originalname}`);
  },
});

// const dpStorage = multerS3({
// @ts-ignore
// s3: s3,
// bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
// metadata: function (req, file, cb) {
//   cb(null, { fieldName: file.fieldname });
// },
// key: function (req, file, cb) {
//   cb(null, Date.now().toString());
// },
// })

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};

export var upload = multer({
  storage: dpStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 2000000, files: 3 },
});
