import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <section className="bg-white text-gray-900 flex-col flex items-center justify-center h-screen">
      <div className="four_zero_four_bg bg-no-repeat w-full">
        <h1 className="text-center  text-[90px] font-black ">404</h1>
      </div>
      <div className="flex-col flex items-center gap-2 justify-center">
        <h3 className="text-center  font-bold text-2xl">Not Found</h3>
        <p className="text-lg ">
          The page you are looking for is not available!
        </p>
        <button className="bg-gray-900 py-2 px-5 text-gray-100 rounded-full">
          <Link href="/">Go Back</Link>
        </button>
      </div>
    </section>
  );
};

export default NotFound;
