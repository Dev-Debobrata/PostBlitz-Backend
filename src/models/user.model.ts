import { Schema, model } from "mongoose";
import { IUser } from "../utils/typings";
import { Blog } from "./blog.model";

const userSchema = new Schema<IUser>({
  name: {
    type: "string",
    required: true,
  },
  username: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  image: {
    data: Buffer,
    contentType: "String",
  },
  email: {
    type: "string",
    required: true,
  },
  address: {
    type: "string",
    required: true,
  },
  pincode: {
    type: "number",
    required: true,
  },
  country: {
    type: "string",
    required: true,
  },
  // blogs: {
  //   blogID: Blog.id,
  // },
});

export const User = model<IUser>("User", userSchema);
