import S3 from 'aws-sdk/clients/s3';

const region = process.env.AWS_S3_BUCKET_REGION;
const accessKeyId = process.env.AWS_S3_BUCKET_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY;

/**
 * @description - S3 Bucket Configuration
 * @constructor
 * @returns {Promise<void>} - Promise
 */

export const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
})