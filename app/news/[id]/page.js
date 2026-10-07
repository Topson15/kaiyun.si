import Link from "next/link";
import { notFound } from "next/navigation";
import PageFrame from "../../page-frame";
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
        <div className="wrap narrow">
          <p className="eyebrow blue">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="newsMeta">{label}</p>
          {post.cover && <img loading="lazy" decoding="async" className="newsHero" src={post.cover} alt={post.title} />}
          {post.body.split(/\n{2,}/).map((paragraph) => {
            const image = paragraph.trim().match(/^!\[([^\]]*)\]\((\/api\/media\/[a-z0-9]+\.(?:jpg|png|webp|gif)|https:\/\/\S+)\)$/);
            if (image) return <img loading="lazy" decoding="async" className="newsInline" key={image[2]} src={image[2]} alt={image[1] || "文内配图"} />;
            return <p key={paragraph.slice(0, 24)}>{paragraph}</p>;
          })}
          <Link className="more" href="/news">返回开云新闻资讯</Link>
        </div>
      </article>
    </PageFrame>
  );
}
