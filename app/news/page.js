import PageFrame from "../page-frame";

export const metadata = {
  title: "开云新闻资讯",
  alternates: { canonical: "/news" },
  openGraph: { url: "/news" },
};

export default function NewsPage() {
  return (
    <PageFrame>
      <section className="newsBlank" />
    </PageFrame>
  );
}
