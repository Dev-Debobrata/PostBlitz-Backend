export type IUser = {
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
  blogs: string[];
  likedBlogs: string[];
  created_At: number;
  updated_At: number;
};

export type IBlog = {
  _id: string;
  author: Types.ObjectId;
  title: string;
  description: string;
  content: string;
  categories: string[];
  images: string[];
  likes: number;
  created_At: number;
  updated_At: number;
};
