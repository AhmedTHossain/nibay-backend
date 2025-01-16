/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // API Routes
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" }, // Set true only if credentials are required
          { key: "Access-Control-Allow-Origin", value: "*" }, // Change "*" to specific origin if using credentials
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type, Authorization, X-Requested-With, Accept",
          },
        ],
      },

      // Static Files (e.g., `/uploads`)
      {
        source: "/uploads/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

export default nextConfig;
