export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/media/"],
      disallow: ["/admin", "/api/admin", "/api/support"],
    },
    sitemap: "https://kaiyun.si/sitemap.xml",
  };
}

