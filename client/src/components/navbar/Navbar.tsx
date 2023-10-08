"use client";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navlinks = [
  { name: "Home", link: "/" },
  { name: "Blogs", link: "/blogs" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
  { name: "Write", link: "/write" },
];

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <nav className="fixed top-5 z-50 right-0 left-0 lg:w-[70vw] md:w-[90vw]  lg:mx-auto md:mx-auto mx-5 backdrop-blur-sm  bg-gray-700/10 border-[0.1px] border-gray-600 lg:px-10 md:px-10 px-5 rounded-full py-2 text-white flex justify-between items-center ">
      <div>
        <Link href="/" className="font-black gradient_text text-xl">
          Postblitz
        </Link>
      </div>
      <ul className=" hidden lg:flex md:flex  items-center justify-center gap-10">
        {Navlinks.map((link, index) => (
          <li key={`${link.name}-${index}`}>
            <Link
              href={link.link}
              className={`text-gray-400 ${
                pathName === link.link && "text-white"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden lg:flex md:flex items-center justify-center gap-5">
        <button onClick={() => router.push("/signup")}>Sign Up</button>
      </div>
      <MenuIcon className="lg:hidden md:hidden" />
    </nav>
  );
};

export default Navbar;
