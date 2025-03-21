import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
          {
            source: "/api/:path*",
            headers: [
              { key: "Access-Control-Allow-Origin", value: "*" },
              { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
            ],
          },
        ];
    },
    webpack: (config, { dev }) => {
      if (dev) {
          config.devtool = "source-map";
      }
      return config;
  },
};

export default nextConfig;
  