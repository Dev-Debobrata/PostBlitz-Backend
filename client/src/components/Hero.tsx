import { IBlog } from "@/typings";
import BlogHeroCard from "./blogs/BlogHeroCard";

interface Props {
  blogs: IBlog[];
}

export default function Hero({ blogs }: Props) {
  const topThreeBlogs = blogs
    .sort((a, b) => {
      return b.likes - a.likes;
    })
    .slice(0, 3);

  return (
    <div className="h-[800px] w-full p-3 grid grid-rows-3 grid-cols-1 gap-3 md:h-[1000px] lg:h-[600px] lg:w-[1400px] lg:grid-rows-4 lg:grid-cols-12 lg:gap-2">
      <div className="row-span-1 col-span-1 lg:col-span-8 lg:row-span-4">
        <BlogHeroCard blog={topThreeBlogs[0]} />
      </div>
      <div className="row-span-1 col-span-1 lg:col-span-4 lg:row-span-2">
        <BlogHeroCard blog={topThreeBlogs[1]} />
      </div>
      <div className="row-span-1 col-span-1 lg:col-span-4 lg:row-span-2">
        <BlogHeroCard blog={topThreeBlogs[2]} />
      </div>
    </div>
  );
}
