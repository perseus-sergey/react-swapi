/** @type {import('next').NextConfig} */

NEXT_PUBLIC_BASE_PATH = './';

const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH, // Sets the base path to `./`.
};

export default nextConfig;
