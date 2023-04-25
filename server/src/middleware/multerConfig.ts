import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import multerS3 from 'multer-s3';
import { v4 } from 'uuid';
import { s3 } from '../utils/s3Config';

const dpStorage = multerS3({
  s3: s3,
  bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
  metadata: function (req: Request, file: Express.MulterS3.File, cb) {
    cb(null, { fieldName: `${v4()}-${file.originalname}` });
  },
  key: function (req: Request, file: Express.MulterS3.File, cb) {
    cb(null, `${v4()}-${Date.now().toString()}`);
  }
});

const fileFilter = (
  req: Request,
  file: Express.MulterS3.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Image uploaded is not of type jpg/jpeg or png'));
  }
};

/**
 * @description Multer configuration to upload files to AWS S3
 * @constructor
 * @param {multerS3} s3 - AWS S3 config
 * @param {multerS3} bucket - AWS S3 Bucket
 * @param {multerS3} metadata - AWS S3 Metadata
 * @param {multerS3} key - AWS S3 Key
 * @param {multer} fileFilter - File filter
 * @param {multer} limits - File size limit
 * @returns {multer} Multer config
 * @returns {multerS3} Multer S3 config
 */

export const upload = multer({
  storage: dpStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 2000000, files: 3 }
});
