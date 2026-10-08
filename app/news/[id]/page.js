import { notFound } from "next/navigation";
import PageFrame from "../../page-frame";
import ArticleView from "../article-view";
import { getPost } from "../../../lib/news-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = getPost(id);
  if (!post) return { title: "开云新闻资讯" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.id}` },
    openGraph: { url: `/news/${post.id}`, title: `${post.title}｜KAIYUN.SI`, description: post.excerpt },
  };
}

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const post = getPost(id);
  if (!post) notFound();
  const date = new Date(post.publishedAt);
  const label = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.excerpt,
    mainEntityOfPage: `https://kaiyun.si/news/${post.id}`,
  };
  return (
    <PageFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="newsPage article">
        <ArticleView category={post.category} title={post.title} label={label} cover={post.cover} body={post.body} />
      </article>
    </PageFrame>
  );
}
