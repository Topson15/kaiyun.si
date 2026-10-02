import PageFrame from "../page-frame";

export const metadata = {
  title: "开云常见问题",
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq" },
};

const faqs = [
  ["在这里可以了解哪些开云体育信息？", "本站整理开云体育相关介绍、热门赛事与活动资讯，方便访客按需查阅。具体服务内容与规则，请以对应服务页面的最新说明为准。"],
  ["怎样查看自己关注的足球或电竞赛事？", "可以从开云体育APP进入，按联赛、赛事名称或参赛队伍查找相关信息。比赛时间和赛程可能调整，请留意赛事主办方的最新公告。"],
  ["浏览网站需要下载开云App吗？", "本站公开内容无需下载开云App，使用手机或电脑浏览器即可。涉及其他服务时，请先核实来源及使用要求。"],
  ["查看活动时，需要注意哪些规则？", "建议先确认好开云体育的活动期限、参与资格、申请方式及奖励条件。不同活动的要求可能不同，具体以活动页面公布的规则为准。"],
  ["页面信息与最新公告不一致怎么办？", "赛事安排和活动规则可能更新。如发现日期、内容或链接不一致，可以通过联系页面反馈，并以对应赛事或服务方的最新公告为准。"],
  ["有其他问题，如何联系咨询？", "请通过本站联系页面公布的方式咨询。描述问题时，可以附上相关页面名称或截图，方便核对；请勿提供账户密码或验证码。"],
];

export default function FaqPage() {
  return (
    <PageFrame>
      <section className="faq">
        <div className="wrap">
          <p className="eyebrow">FAQ</p>
          <h2>常见问题</h2>
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
