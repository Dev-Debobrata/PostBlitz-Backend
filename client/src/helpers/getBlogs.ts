import { IBlog } from "@/utils/types";
import { blogs } from "@/public/blogs";

export const getBlogs = async (): Promise<IBlog[] | undefined> => {
  try {
    // const response = await fetch(
    //   "/home/destructor/Desktop/IT/Blog_Next_JS_Website/public/blogs.json"
    // );

    // if (!response) {
    //   return;
    // }

    // const data = await response.json();

    const data = blogs;
    const sortedBlogs = data.sort((a: IBlog, b: IBlog) => b.likes - a.likes);

    return sortedBlogs.slice(0, 6);
  } catch (err) {
    console.error(err);
  }
};
