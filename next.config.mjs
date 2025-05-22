import createMDX from "@next/mdx";

const basePath = ""; // process.env.NODE_ENV === "production" ? "/hyperjump.tech" : "";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"]
};
const withMDX = createMDX();

export default withMDX(nextConfig);
