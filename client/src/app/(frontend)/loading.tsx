"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      loading...
    </div>
  );
};

export default LoadingPage;
