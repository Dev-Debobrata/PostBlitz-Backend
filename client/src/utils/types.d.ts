/**
 * @Description: This file contains all the types used in the project
 * @params {IUser} - This interface is used to define the type of user
 * @params {IBlog} - This interface is used to define the type of blog
 * @params {IAdmin} - This interface is used to define the type of admin
 */

import { ObjectId } from "mongodb";

export type IUser = {
  _id: ObjectId | undefined;
  name: string;
  username: string;
  password: string;
  image: string;
  email: string;
  address: string;
  pincode: number;
  country: string;
  blogs: string[];
  likedBlogs: string[];
  created_At: number;
  updated_At: number;
};

export type IBlog = {
  _id: string;
  author: {
    name: string;
    username: string;
    image: string;
  };
  title: string;
  description: string;
  content: string;
  categories: string[];
  images: string[];
  likes: number;
  created_At: number;
  updated_At: number;
};

export type IAdmin = {
  _id: string;
  sessionId: string;
  name: string;
  username: string;
  password: string;
  image: string;
  email: string;
  address: string;
  pincode: number;
  country: string;
  created_At: number;
  updated_At: number;
};
