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
  ["浏览本站需要下载开云APP吗？", "看首页、游戏介绍和合作说明，用手机或电脑浏览器即可。需要安装客户端时，再到开云APP下载里选择对应版本。"],
  ["开云全站APP、开云体育APP、开云真人APP和登录器有什么区别？", "全站APP包含体育、电竞、真人、彩票和电子。体育APP侧重赛事竞猜，真人APP侧重真人视讯。登录器用于在 Windows、Mac 和 Android 上打开网页版。"],
  ["想成为开云代理，从哪里开始？", "个人或已有推广渠道的团队，可以通过本页 Telegram：@a8802717 说明现有资源和合作意向。合作方式以双方确认的方案为准。"],
  ["开云代理的佣金和活动以哪份说明为准？", "结算周期、考核条件和活动奖励，先看开云代理招商页，再以双方确认的最新方案为准。活动期限和参与要求可能调整。"],
  ["开云游戏有哪些类型？", "首页列出的游戏有开云体育、开云真人、开云棋牌、开云电竞、开云彩票和开云电子。"],
  ["还有问题可以找谁？", "合作相关可联系 Telegram：@a8802717，小助手Telegram：@kytyk。"],
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
          <h2>开云代理常见问题</h2>
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
