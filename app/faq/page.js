import PageFrame from "../page-frame";

export const metadata = {
  title: "开云代理常见问题",
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq", title: "开云代理常见问题｜KAIYUN.SI" },
};

const faqs = [
  ["申请开云代理前，需要准备哪些信息？", "准备三样：现有推广渠道、主要受众，以及打算怎么合作。个人和已有渠道的团队都可以。把这三样发给 Telegram @a8802717，用来确认适合的合作方式。"],
  ["没有代理经验，可以先了解合作吗？", "可以。先问清申请条件、结算方式和日常怎么核对数据，再决定是否申请。没有现成团队也可以，通过 Telegram @a8802717 说明自己的时间和渠道即可。"],
  ["开云代理佣金如何核对？", "登录代理后台，打开「佣金报表」，核对统计周期、计算依据、扣除项目和结算条件。派发前先点右上方「发佣验证」，页面显示「已验证」后再点「佣金申请」。当期哪几天可以申请，以开云新闻资讯里的派发通知为准。"],
  ["代理活动奖励可以与佣金同时领取吗？", "不一定。佣金按已确认的合作方案结算，活动奖励只看该活动自己的期限、资格和限制。两份规则不能互相套用。申请前先看开云代理招商页，再以当期写明的细则为准。"],
  ["开展代理合作前，应确认哪些细节？", "先确认五件事：双方各负责什么、推广有什么要求、数据在哪里核对、多久结算一次、怎样结束合作。这几项没有写清之前，不要按口头说法投入。可先问 Telegram @a8802717。"],
  ["开云代理政策调整后，如何确认新规则？", "看三处：从哪一天生效、适用于哪些业务、已经产生的佣金怎么算。涉及结算的变动要留下双方确认记录。最新方案以开云代理招商页和 Telegram @a8802717 的回复为准，不沿用旧截图。"],
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
