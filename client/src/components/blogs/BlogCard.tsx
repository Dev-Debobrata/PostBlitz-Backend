import { IBlog } from "@/typings";
import Image from "next/image";

interface Props {
  blog: IBlog;
}

export default function BlogCard({ blog }: Props) {
  return (
    <div className="card card-side bg-base-100 my-4 md:h-[134px] md:w-[500px]">
      <figure className="w-[40%]">
        <div className="carousel carousel-vertical rounded-box h-[134px] w-[200px]">
          {blog.images?.map((image) => (
            <div className="carousel-item h-full">
              <Image
                key={image}
                src={image}
                alt={blog.title}
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{blog.title}</h2>
        <p>{blog.description}</p>
      </div>
    </div>
  );
}
