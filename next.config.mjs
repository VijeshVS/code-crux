/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      // Ignore TypeScript errors
      ignoreBuildErrors: true,
    },
    eslint: {
      // Ignore ESLint warnings and errors during builds
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;
  