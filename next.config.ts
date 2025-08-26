import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Exclude refine-backoffice from the build
  distDir: '.next',
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  outputFileTracingRoot: process.cwd(),
  outputFileTracingExcludes: {
    '*': [
      'refine-backoffice-temp/**/*',
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
  },
  webpack: (config, { isServer }) => {
    // Exclude refine-backoffice directory from compilation
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /refine-backoffice-temp/,
    });
    
    return config;
  },
};

export default nextConfig;
