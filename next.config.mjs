/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable API headers for CORS
  async headers() {
    return [
      {
        source: "/api/:path*", // Matching all API routes
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },

  // Configure image handling
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nibay.co", // Your VPS IP
        port: "", // No port required if running on default
        pathname: "/uploads/**", // Allow access to /uploads
      },
    ],
  },

  // Handle redirects to avoid infinite loops
  async redirects() {
    return [
      {
        source: "/_next/image",
        destination: "https://nibay.co/_next/image",
        permanent: false,
      },
    ];
  },

  // Add additional environment configuration
  env: {
    BASE_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "http://173.231.56.108",
  },
};

export default nextConfig;
