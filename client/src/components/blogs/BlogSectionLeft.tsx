import { IBlog } from "@/typings";
import BlogCard from "./BlogCard";

interface Props {
  blogs: IBlog[];
}

export default function BlogSectionLeft({ blogs }: Props) {
  return (
    <div className="grid grid-rows-12 grid-cols-1 gap-2 p-2">
      {blogs.map((blog) => {
        return (
          <div key={blog._id} className="bg-green-200 h-[400px]">
            {blog.title}
          </div>
        );
      })}
    </div>
  );
}
