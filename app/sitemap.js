export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: "https://kaiyun.si", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://kaiyun.si/cooperation", lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://kaiyun.si/commission", lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://kaiyun.si/faq", lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://kaiyun.si/news", lastModified, changeFrequency: "weekly", priority: 0.6 },
  ];
}

