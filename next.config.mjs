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
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  /**
   * Ensure Turbopack knows how to handle MDX files that are imported
   * outside of the `app`/`pages` directories (e.g. from `locales/`).
   * See: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#configuring-webpack-loaders
   */
  turbopack: {
    rules: {
      "**/*.{md,mdx}": {
        loaders: ["@mdx-js/loader"]
      }
    }
  }
};
const withMDX = createMDX();

export default withMDX(nextConfig);
