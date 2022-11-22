export type IUser = {
  id: String;
  sessionId: String;
  name: String;
  username: String;
  password: String;
  image: String;
  email: String;
  address: String;
  pincode: Number;
  country: String;
  blogs: String[];
  likedBlogs: String[];
  created_At: Number;
  updated_At: Number;
};

export type IBlog = {
  id: String;
  author: String;
  title: String;
  description: String;
  content: String;
  categories: String[];
  images: String[];
  likes: Number;
  created_At: Number;
  updated_At: Number;
};
