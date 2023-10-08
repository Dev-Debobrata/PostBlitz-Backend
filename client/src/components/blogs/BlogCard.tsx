import { IBlog } from "@/utils/types";
import Image from "next/image";
import React from "react";

interface Props {
  blog: IBlog;
}

const BlogCard = ({ blog }: Props) => {
  return (
    <div className=" h-40 space-x-2 p-3 rounded-xl bg-[#111111] border border-gray-500 flex items-center justify-between shadow-2xl cursor-pointer shadow-black">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-start gap-1">
          <Image
            src={blog.images[0]}
            alt="author"
            width={30}
            height={30}
            className="rounded-full"
          />
          <p className="text-gray-300 text-sm">{blog.author.name}</p>
        </div>
        <h1 className="text-base font-semibold">{blog.title}</h1>
        <p className="text-gray-300 text-sm truncate">{blog.description}</p>

        <p className="text-xs text-gray-400">{blog.created_At}</p>
      </div>
      <div className="relative w-[35%] h-full object-contain">
        <Image
          src={blog.images[0]}
          alt="conetent"
          fill
          className="rounded-xl object-cover"
        />
      </div>
    </div>
  );
};

export default BlogCard;
