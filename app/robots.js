export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://kaiyun.si/sitemap.xml",
  };
}

