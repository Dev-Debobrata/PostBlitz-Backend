import { blogs } from "@/public/blogs";

export const getBlog = async (_id: string) => {
  // const data = await fetch("");

  // const blog = await data.json();

  const blog = blogs.find((blog) => blog._id === _id);

  return blog;
};
