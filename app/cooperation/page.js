import PageFrame from "../page-frame";

export const metadata = {
  title: "开云代理合作",
  alternates: { canonical: "/cooperation" },
  openGraph: { url: "/cooperation" },
};

export default function CooperationPage() {
  return (
    <PageFrame>
      <section className="light">
        <div className="wrap subpage">
          <p className="eyebrow blue">PARTNERSHIP</p>
          <h2>开云代理合作</h2>
          <p className="sub">了解代理合作、佣金政策、结算规则与推广方向。把常用合作信息集中整理，让合作更清晰、更简单。</p>
          <p className="sub">合作前先把规则说清楚。佣金比例、有效业绩和结算周期，应以双方当前确认的合作方案为准。</p>
          <div className="policyBtns">
            <a className="btn" href="/commission">查看开云佣金政策</a>
            <a className="btn" href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">TG：@a8802717</a>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
