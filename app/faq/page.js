import PageFrame from "../page-frame";

export const metadata = {
  title: "开云代理常见问题",
  description: "说明申请开云代理要准备的资料、没有经验能否咨询、佣金怎么核对，以及活动奖励和规则调整以哪份说明为准。",
  alternates: { canonical: "/faq" },
  openGraph: {
    url: "/faq",
    title: "开云代理常见问题｜KAIYUN.SI",
    description: "说明申请开云代理要准备的资料、没有经验能否咨询、佣金怎么核对，以及活动奖励和规则调整以哪份说明为准。",
  },
};

const faqs = [
  ["申请开云代理前，需要准备哪些信息？", "申请开云代理前，准备三项信息：现有推广渠道、主要受众、合作计划。个人或已有团队都可以。把这三项发给 Telegram @a8802717，即可按你的情况确认合作方式。"],
  ["没有开云代理经验，可以先了解合作吗？", "可以。没有开云代理经验，也可以先了解申请条件、佣金结算和数据核对方式，再决定是否申请。把时间和现有渠道告诉 Telegram @a8802717 即可。"],
  ["开云代理佣金如何核对？", "核对开云代理佣金，请登录代理后台，打开「佣金报表」，核对统计周期、计算依据、扣除项目和发放条件。发放前先点右上角「发佣验证」，显示「已验证」后再点「佣金申请」。当月可申请的日期，以开云新闻资讯中的派发通知为准。"],
  ["开云代理活动奖励可以和佣金同时领取吗？", "开云代理的活动奖励不一定能和佣金同时领取。佣金按已确认的合作方案结算，活动奖励只看该活动的期限、资格和限制，不能套用到其他活动。领取前先看开云代理招商页，以当期写明的细则为准。"],
  ["开展开云代理合作前，要确认哪些细节？", "开展开云代理合作前，先确认五件事：双方职责、推广要求、数据核对方式、结算周期、合作如何结束。这几项没有写清之前，不要按口头约定投入。可先通过 Telegram @a8802717 确认。"],
  ["开云代理政策调整后，如何确认新规则？", "开云代理政策调整后，先确认生效日期、适用范围，以及已经产生的佣金是否仍按旧规则计算。涉及结算的变动，保留双方确认记录。以开云代理招商页和 Telegram @a8802717 的回复为准，不用旧截图代替最新规则。"],
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
