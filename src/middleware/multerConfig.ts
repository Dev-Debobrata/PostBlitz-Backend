import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const dpStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, "uploads");
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(null, file.originalname);
  },
});

export var upload = multer({ storage: dpStorage });
