import { IBlog } from "@/typings";

interface Props {
  blogs: IBlog[];
}

export default function BlogSectionRight({ blogs }: Props) {
  return (
    <div className="flex flex-col items-center space-y-2 p-2">
      {blogs.map((blog) => {
        return (
          <div key={blog._id} className="bg-green-200 h-[200px] w-full">
            {blog.title}
          </div>
        );
      })}
    </div>
  );
}
