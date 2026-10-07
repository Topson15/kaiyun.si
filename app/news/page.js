import Link from "next/link";
import PageFrame from "../page-frame";
import { listPosts } from "../../lib/news-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "开云新闻资讯",
  description: "开云体育相关的下载说明、代理合作与常见问题更新。",
  alternates: { canonical: "/news" },
  openGraph: { url: "/news", title: "开云新闻资讯｜KAIYUN.SI" },
};

function dateParts(value) {
  const date = new Date(value);
  return {
    day: date.getDate(),
    month: `${date.getMonth() + 1}月`,
  };
}

export default function NewsPage() {
  const posts = listPosts();
  return (
    <PageFrame>
      <section className="newsPage">
        <div className="wrap">
          <p className="eyebrow blue">KAIYUN NEWS</p>
          <h1>开云新闻资讯</h1>
          <div className="newsList">
            {posts.map((post) => {
              const date = dateParts(post.publishedAt);
              return (
                <article className={post.cover ? "newsItem has-cover" : "newsItem"} key={post.id}>
                  <div className="newsCopy">
                    <div className="newsTop">
                      <time dateTime={post.publishedAt}>
                        <b>{date.day}</b>
                        <span>{date.month}</span>
                      </time>
                      <div>
                        <em>{post.category}</em>
                        <h2><Link href={`/news/${post.id}`}>{post.title}</Link></h2>
                      </div>
                    </div>
                    <p>{post.excerpt}</p>
                    <Link className="more" href={`/news/${post.id}`}>继续阅读 →</Link>
                  </div>
                  {post.cover && <img loading="lazy" decoding="async" className="newsCover" src={post.cover} alt={post.title} />}
                </article>
              );
            })}
            {!posts.length && <p className="sub">还没有文章。</p>}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
