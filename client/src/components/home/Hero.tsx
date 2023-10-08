import { IBlog } from "@/utils/types";
import { LucideArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Props {
  blogs: IBlog[];
}

const Hero = ({ blogs }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center  min-h-[90vh] w-full px-5 ">
      <h1 className="text-gray-300 font-black text-center lg:text-[100px] leading-[1] md:text-[90px] text-[60px] ">
        Welcome to the world <br /> of{" "}
        <span
          className={`gradient_text font-["Dancing_Script"] lg:text-[110px] md:text-[100px] text-[70px]`}
        >
          Blog
        </span>{" "}
        writing
      </h1>
      <p className="text-gray-400 mt-10 lg:w-[40vw] w-full text-center mx-auto md:w-[80vw]">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum magni
        eaque molestiae inventore dolores sunt.
      </p>

      <p className="text-gray-400 mt-10 lg:w-[40vw] w-full text-center mx-auto hover:text-white hover:font-bold md:w-[80vw]">
        <Link
          href={{
            pathname: "/blogs",
          }}
        >
          Check out the latest blogs
          <LucideArrowUpRight className="inline-block hover:font-bold" />
        </Link>
      </p>
    </div>
  );
};

export default Hero;
