const baseUrl = process.env.BASE_URL;
import { IBlog } from "@/typings";

export const getBlogs = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/blogs`);
    const data: IBlog[] = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
