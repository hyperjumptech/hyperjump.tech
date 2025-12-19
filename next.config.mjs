import createMDX from "@next/mdx";

const basePath = ""; // process.env.NODE_ENV === "production" ? "/hyperjump.tech" : "";
/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: basePath,
  basePath,
  images: {
    unoptimized: true
  },
  output: "export",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"]
};
const withMDX = createMDX();

export default withMDX(nextConfig);
