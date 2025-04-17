const basePath = ""; // process.env.NODE_ENV === "production" ? "/hyperjump.tech" : "";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
