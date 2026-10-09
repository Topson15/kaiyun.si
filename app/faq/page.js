import PageFrame from "../page-frame";

export const metadata = {
  title: "开云代理常见问题",
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq", title: "开云代理常见问题｜KAIYUN.SI" },
};

const faqs = [
  ["申请开云代理前，需要准备哪些信息？", "建议整理现有推广渠道、主要受众及合作计划，方便沟通具体要求，了解适合自身资源的合作方式。"],
  ["没有代理经验，可以先了解合作吗？", "可以先咨询申请条件、结算方式和运营要求，再结合自己的时间与渠道资源评估是否参与。"],
  ["开云代理佣金如何核对？", "核对佣金时，应确认统计周期、计算依据、扣除项目及结算条件，具体以双方确认的合作方案为准。"],
  ["代理活动奖励可以与佣金同时领取吗？", "是否可以同时领取，需查看对应活动的参与条件、奖励规则及限制，不能将不同活动政策直接套用。"],
  ["开展代理合作前，应确认哪些细节？", "建议明确双方职责、推广要求、数据核对方式、结算安排及合作终止条件，减少后续沟通中的分歧。"],
  ["开云代理政策调整后，如何确认新规则？", "应核实新规则的生效时间、适用范围及已有业务的处理方式，涉及结算的变动建议保留书面确认记录。"],
];

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
  return (
    <PageFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="faq">
        <div className="wrap">
          <p className="eyebrow">FAQ</p>
          <h1>开云代理常见问题</h1>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}<b>＋</b></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
