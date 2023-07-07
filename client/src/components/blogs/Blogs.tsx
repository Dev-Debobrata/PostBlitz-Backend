import { IBlog } from "@/typings";
import BlogCard from "@components/blogs/BlogCard";
interface Props {
  blogs: IBlog[];
}

export default async function Blogs({ blogs }: Props) {
  return (
    <div className="bg-green-200 grid p-3 gap-8 md:h-[1000px] lg:w-[1400px] lg:grid-cols-6 lg:grid-rows-12">
      <div className="bg-yellow-200 lg:col-span-4 lg:row-span-full">1</div>
      <div className="bg-yellow-200 lg:col-span-2 lg:row-span-full">2</div>
    </div>
  );
}
