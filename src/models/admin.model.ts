import { Schema, model } from "mongoose";
import { IAdmin } from "../utils/typings";

const adminSchema = new Schema<IAdmin>({
  sessionId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  created_At: {
    type: Number,
    required: true,
  },
  updated_At: {
    type: Number,
    required: true,
  },
});

export const Admin = model<IAdmin>("Admin", adminSchema);
