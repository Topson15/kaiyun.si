import PageFrame from "../page-frame";
import PolicyZoom from "../policy-zoom";

const points = [
  ["代理申请", "个人与团队都可以咨询，按现有渠道和业务计划沟通适合的合作方式。"],
  ["佣金结算", "结算周期、有效业绩和发放条件，以当期双方确认的方案为准。"],
  ["活动奖励", "活动期限和参与要求可能不同，申请前请先核对细则。"],
  ["日常运营", "合作后的数据核对与问题沟通，可通过本页联系方式进行。"],
];

export const metadata = {
  title: "开云代理招商",
  description: "开云代理招商面向个人与团队，说明代理申请、佣金结算、活动奖励和日常运营中需要先确认的事项。",
  alternates: { canonical: "/commission" },
  openGraph: {
    url: "/commission",
    title: "开云代理招商｜KAIYUN.SI",
    description: "开云代理招商面向个人与团队，说明代理申请、佣金结算、活动奖励和日常运营中需要先确认的事项。",
  },
};

export default function CommissionPage() {
  return (
    <PageFrame>
      <section className="light recruitPage">
        <div className="wrap split">
          <div>
            <p className="eyebrow blue">RECRUITMENT</p>
            <h2>开云代理招商</h2>
            <p className="sub">为有意了解代理合作的个人与团队，提供合作信息与咨询。已有推广渠道，或正在规划业务，都可以按自身资源咨询适合的合作方式。</p>
            <p className="sub">申请前建议先确认结算规则、考核条件和活动细则，再评估投入与发展方向。具体政策以双方确认的最新方案为准。</p>
            <ul className="recruitPoints">
              {points.map(([title, text]) => <li key={title}><b>{title}</b><span>{text}</span></li>)}
            </ul>
            <div className="policyBtns">
              <a className="btn" href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">TG：@a8802717</a>
            </div>
          </div>
          <PolicyZoom label="开云代理政策" />
        </div>
      </section>
    </PageFrame>
  );
}
