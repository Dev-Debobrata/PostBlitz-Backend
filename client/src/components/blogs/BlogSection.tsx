import { IBlog } from "@/typings";
import BlogSectionLeft from "./BlogSectionLeft";
import BlogSectionRight from "./BlogSectionRight";

interface Props {
  blogs: IBlog[];
}

export default function BlogSection({ blogs }: Props) {
  return (
    <div className="bg-blue-200 min-h-[1500px] w-full p-3 grid grid-rows-12 grid-cols-1 gap-8 lg:w-[1400px] lg:grid-cols-12">
      <div className="bg-yellow-200 row-span-4 lg:col-span-8 lg:row-span-full">
        <BlogSectionLeft blogs={blogs} />
      </div>
      <div className="bg-yellow-200 row-span-8 col-span-1 lg:row-span-full lg:col-span-4">
        <BlogSectionRight blogs={blogs} />
      </div>
    </div>
  );
}
