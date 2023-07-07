import { IBlog } from "@/typings";
import Image from "next/image";

interface Props {
  blog: IBlog;
}

export default function BlogHeroCard({ blog }: Props) {
  return (
    // <div className="card w-full h-[240px] mt-2 bg-red image-full md: lg:h-[500px]">
    //   <figure>
    //     <Image
    //       src={blog.images[0]}
    //       alt={blog.title}
    //       width={500}
    //       height={500}
    //       loading="lazy"
    //     />
    //   </figure>
    //   <div className="flex flex-col justify-end p-4">
    //     <h2 className="text-lg font-semibold">{blog.title}</h2>
    //     <p>{blog.description}</p>
    //   </div>
    // </div>
    <div
      // @ts-ignore
      style={{ "--image-url": `url(${blog.images[0]})` }}
      className="w-full h-full bg-[image:var(--image-url)] bg-cover bg-red-400"
    >
      Hello
    </div>
  );
}
