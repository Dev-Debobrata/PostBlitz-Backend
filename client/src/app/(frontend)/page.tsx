import BlogCard from "@/components/blogs/BlogCard";
import Hero from "@/components/home/Hero";
import { getBlogs } from "@/helpers/getBlogs";
import { IBlog } from "@/utils/types";
import Link from "next/link";

const Page = async () => {
  const blogs: IBlog[] | undefined = await getBlogs();

  return (
    <div>
      {blogs ? <Hero blogs={blogs} /> : <h1>Loading...</h1>}
      <p className="text-gray-400 text-xl mt-4 mx-auto md:w-[80vw]">
        Popular Blogs
      </p>
      <div className="pb-36 grid grid-cols-1 justify-center items-center mx-auto gap-10 my-10 px-5 md:grid-cols-2">
        {blogs?.map((blog: IBlog) => (
          <Link key={blog._id} href={`/blogs/${blog._id}`}>
            <BlogCard blog={blog} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
