import Hero from "@/components/Hero";
import BlogSection from "@/components/blogs/BlogSection";
import { getBlogs } from "@/utils/getBlogs";
import { useState } from "react";

export default async function Home() {
  const blogs = (await getBlogs()) || [];

  return (
    <main className="flex flex-col items-center">
      <Hero blogs={blogs} />
      <BlogSection blogs={blogs} />
    </main>
  );
}
