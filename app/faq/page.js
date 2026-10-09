import PageFrame from "../page-frame";

export const metadata = {
  title: "开云代理常见问题",
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq", title: "开云代理常见问题｜KAIYUN.SI" },
};

const faqs = [
  ["申请开云代理前，需要准备哪些信息？", "先把三件事理清楚：你现在用什么渠道在推、主要是哪些人、准备怎么合作。一个人做，或者已经有团队，都可以。直接发给 Telegram @a8802717，对方会按你的情况说适合怎么合作。"],
  ["没有代理经验，可以先了解合作吗？", "可以，没做过也没关系。先问清楚怎么申请、佣金怎么结、平时数据在哪看，再决定做不做。把你的时间和手头渠道告诉 Telegram @a8802717 就行。"],
  ["开云代理佣金如何核对？", "登录代理后台，打开「佣金报表」。看这几项对不对：算的是哪一段时间、按什么算、扣了什么、什么情况下才发。发钱之前，先点右上角「发佣验证」，页面变成「已验证」，再点「佣金申请」。这个月哪几天能申请，看开云新闻资讯里的通知。"],
  ["代理活动奖励可以与佣金同时领取吗？", "不一定能一起拿。佣金按你们已经说好的方案算，活动奖要看那次活动自己的时间和条件。这个活动的规则，不能拿去套另一个。拿之前先看开云代理招商页，以当期写清楚的说明为准。"],
  ["开展代理合作前，应确认哪些细节？", "先把这五件问明白：两边各自干什么、推广有什么要求、数据在哪对、多久结一次账、不做了怎么停。没写清楚之前，别按嘴上说的就投入。可以先问 Telegram @a8802717。"],
  ["开云代理政策调整后，如何确认新规则？", "规则改了，先看三件事：哪天开始算、改的是哪部分、已经产生的佣金还按不按旧的算。碰到结算，把双方确认的话留下来。以开云代理招商页和 Telegram @a8802717 的回复为准，别拿旧截图当最新规则。"],
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
