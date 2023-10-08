const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "post-blitz.s3.ap-northeast-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
