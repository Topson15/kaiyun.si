/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { inlineCss: true },
  async redirects() {
    return [{ source: "/cooperation", destination: "/download", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|gif|ico|woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

module.exports = nextConfig;
