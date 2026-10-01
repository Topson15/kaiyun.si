import PageFrame from "../page-frame";
import PolicyZoom from "../policy-zoom";

export const metadata = { title: "佣金政策" };

export default function CommissionPage() {
  return (
    <PageFrame>
      <section className="light">
        <div className="wrap split">
          <div>
            <p className="eyebrow blue">POLICY & SETTLEMENT</p>
            <p className="policyName">开云体育佣金政策</p>
            <h2>佣金 · 政策 · 结算</h2>
            <p className="sub">合作前先把规则说清楚。佣金比例、有效业绩和结算周期，应以双方当前确认的合作方案为准。</p>
            <div className="policyBtns">
              <a className="btn" href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">TG：@a8802717</a>
            </div>
          </div>
          <PolicyZoom />
        </div>
      </section>
    </PageFrame>
  );
}
