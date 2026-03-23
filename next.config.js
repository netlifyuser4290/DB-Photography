/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "display-capture=()", // Blocks browser Screen Capture API (getDisplayMedia)
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
