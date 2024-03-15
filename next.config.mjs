/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.node$/,
      loader: "nextjs-node-loader",
    });

    return config;
  },
};

export default nextConfig;
