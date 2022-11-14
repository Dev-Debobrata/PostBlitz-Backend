export type IUser = {
  id: String;
  name: String;
  username: String;
  password: String;
  image: String;
  email: String;
  address: String;
  pincode: Number;
  country: String;
  blogs: {
    blogID: String;
    liked: Boolean;
  };
};

export type IBlog = {
  id: String;
  author: String;
  title: String;
  description: String;
  content: String;
  categories: String[];
  images: String[];
  urls: String[];
  likes: String[];
  shareLink: string;
};
