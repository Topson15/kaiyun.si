import { listPosts } from "../lib/news-store";

export const dynamic = "force-dynamic";

export default function sitemap() {
  const lastModified = new Date();
  const posts = listPosts().map((post) => ({
    url: `https://kaiyun.si/news/${post.id}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [
    { url: "https://kaiyun.si", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://kaiyun.si/download", lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://kaiyun.si/commission", lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://kaiyun.si/faq", lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://kaiyun.si/news", lastModified, changeFrequency: "weekly", priority: 0.6 },
    ...posts,
  ];
}