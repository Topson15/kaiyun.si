import SiteHeader from "./site-header";
import ServiceGauges from "./service-gauges";
import PolicyZoom from "./policy-zoom";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "KAIYUN.SI｜代理合作与行业资讯" },
};

const articles = [
  ['代理合作前，先确认哪几件事？', '合作指南'],
  ['代理佣金通常看哪些数据？', '佣金政策'],
  ['如何规划长期推广渠道？', '经营经验']
];

export default function Home() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KAIYUN.SI",
    url: "https://kaiyun.si",
    description: "代理合作、佣金政策、推广经验与行业资讯。",
    inLanguage: "zh-CN",
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <SiteHeader />

      <section className="hero">
        <div className="glow"></div>
        <div className="wrap heroGrid">
          <div>
            <h1>开云体育官方<br/><em>代理合作</em></h1>
            <p className="eyebrow"><span className="domName">kaiyun</span><span className="domDot">.</span><span className="domTld">si</span></p>
            <p className="lead">了解代理合作、佣金政策、结算规则与推广方向。把常用合作信息集中整理，让合作更清晰、更简单。</p>
            <div className="actions">
              <a className="btn" href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer">开云体育注册</a>
              <a className="ghost heroSecondBtn" href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">了解代理合作</a>
            </div>
          </div>
          <div className="heroStage">
            <div className="heroArtWrap">
              <img loading="lazy" decoding="async" className="heroArtEdge" src="/hero-art.webp" alt="" />
              <img className="heroArt" fetchPriority="high" decoding="async" width="960" height="832" src="/hero-art.webp" alt="" />
            </div>
            <div className="heroReflect" aria-hidden="true"><img loading="lazy" decoding="async" src="/hero-art.webp" alt="" /></div>
          </div>
        </div>
      </section>

      <section id="insights" className="client"><div className="wrap">
        <p className="eyebrow blue">APP DOWNLOAD</p>
        <h2 className="clientTitle">开云APP下载</h2>
        <div className="clientBox">
          <input type="radio" name="appTab" id="tab-all" />
          <input type="radio" name="appTab" id="tab-sport" defaultChecked />
          <input type="radio" name="appTab" id="tab-live" />
          <input type="radio" name="appTab" id="tab-login" />
          <div className="clientTabs">
            <label htmlFor="tab-all">全站APP</label>
            <label htmlFor="tab-sport">体育APP</label>
            <label htmlFor="tab-live">真人APP</label>
            <label htmlFor="tab-login">登录器</label>
          </div>
          <div className="clientStage">
            <img loading="lazy" decoding="async" className="clientArt art-all" src="/app-all.webp" alt="开云全站APP" />
            <img loading="lazy" decoding="async" className="clientArt art-sport" src="/app-sport.webp" alt="开云体育APP" />
            <img loading="lazy" decoding="async" className="clientArt art-live" src="/app-live.webp" alt="开云真人APP" />
            <img loading="lazy" decoding="async" className="clientArt art-login" src="/login-client.webp" alt="开云登录器" />
          </div>
          <div className="clientCopy panel-all"><h3>全站APP</h3><p>全球首家一体化娱乐原生APP，尽显流畅，完美操作。海量体育、电竞顶尖赛事，真人娱乐、彩票投注及电子游艺等，最新最全娱乐项目尽在掌中体验扫码下载，即刻拥有！</p><div className="appGet"><div className="qrBox"><img loading="lazy" decoding="async" src="/app-qr-all.webp" alt="开云全站APP下载二维码" /><b>扫码下载</b><span>支持iOS&Android</span></div><div className="directBox"><a href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer">http://5257y.com/</a><b>直接访问</b><span>无需下载，手机输入网址即可</span><span>请用国内网络打开即可</span></div></div></div>
          <div className="clientCopy panel-sport"><h3>体育APP</h3><p>业内赔率最高！覆盖世界各地赛事，让球、大小、半全场、波胆、单双、总入球、连串过关等多元竞猜。更有动画直播，让您体验轻松聊球，娱乐投注两不误。</p><div className="appGet"><div className="qrBox"><img loading="lazy" decoding="async" src="/app-qr-sport.webp" alt="开云体育APP下载二维码" /><b>扫码下载</b><span>支持iOS&Android</span></div><div className="directBox"><a href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer">http://5257y.com/</a><b>直接访问</b><span>无需下载，手机输入网址即可</span><span>请用国内网络打开即可</span></div></div></div>
          <div className="clientCopy panel-live"><h3>真人APP</h3><p>最美荷官在线互动，带您玩转百家乐、骰宝、轮盘、牛牛、炸金花等多款真人视讯游戏。国际标准、公平公正，极致享受尽在开云真人。</p><div className="appGet"><div className="qrBox"><img loading="lazy" decoding="async" src="/app-qr-live.webp" alt="开云真人APP下载二维码" /><b>扫码下载</b><span>支持iOS&Android</span></div><div className="directBox"><a href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer">http://5257y.com/</a><b>直接访问</b><span>无需下载，手机输入网址即可</span><span>请用国内网络打开即可</span></div></div></div>
          <div className="clientCopy panel-login">
            <h3>官方登录器</h3>
            <p>开云倾情打造，自主开发防劫持安全登录器。<br/>登录器支持 Windows｜MAC｜Android系统平台，使用登录器可直接访问开云WEB站点，有效防御和避免站点被拦截/劫持等问题。登录器安装简单，能给玩家提供安全的游戏环境体验！</p>
            <div className="downloads">
              <a href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer"><i className="os win"></i><span>Windows 版本</span><b>下载</b></a>
              <a href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer"><i className="os mac"></i><span>MacOS 版本</span><b>下载</b></a>
              <a href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer"><i className="os android"></i><span>Android 版本</span><b>下载</b></a>
            </div>
          </div>
        </div>
      </div></section>

      <section id="games" className="dark games"><div className="wrap">
        <p className="eyebrow">KAIYUN GAMES</p>
        <h2 className="gameTitle">开云游戏</h2>
        <p className="gameLead">我们拥有市面上大多数种类的游戏</p>
        <div className="gameBox">
          <input type="radio" name="gameTab" id="game-sport" defaultChecked />
          <input type="radio" name="gameTab" id="game-live" />
          <input type="radio" name="gameTab" id="game-chess" />
          <input type="radio" name="gameTab" id="game-esport" />
          <input type="radio" name="gameTab" id="game-lottery" />
          <input type="radio" name="gameTab" id="game-slot" />
          <div className="gameTabs">
            <label htmlFor="game-sport">开云体育</label>
            <label htmlFor="game-live">开云真人</label>
            <label htmlFor="game-chess">开云棋牌</label>
            <label htmlFor="game-esport">开云电竞</label>
            <label htmlFor="game-lottery">开云彩票</label>
            <label htmlFor="game-slot">开云电子</label>
          </div>
          <div className="gamePanel panel-sport"><img loading="lazy" decoding="async" src="/games/sport.webp" alt="开云体育" /><div className="gameCard"><h3>开云体育</h3><p>开云体育提供行业领先的体育竞猜平台，为玩家带来最高赔率和流畅的投注体验。我们提供全网覆盖面最广、画质最高清的赛事视频，让您享受精彩的体育观赛体验。我们拥有最多的投注类型，并提供最强大的投注功能，包括提前兑现和快速结算，满足您的个性化需求。</p><p>我们提供业内最高赔率，并覆盖全球各地的赛事，包括足球、篮球等多种竞猜选项，如让球、大小、半全场、波胆、单双、总入球、连串过关等。此外，我们还提供动画直播和视频直播功能，让您轻松参与球赛讨论并进行投注，让您乐在其中。</p><a className="gameGo" href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer">进入游戏</a></div></div>
          <div className="gamePanel panel-live"><img loading="lazy" decoding="async" src="/games/live.webp" alt="开云真人" /><div className="gameCard"><h3>开云真人</h3><p>开云真人视讯为开云集团官方直营，最美荷官在线互动，带您玩转百家乐、骰宝、轮盘、牛牛、炸金花等多款真人视讯游戏，国际标准、公平公正，极致享受尽在开云真人，互动娱乐在线直播平台，让玩家游戏的同时，观赏美女主播表演、参与互动游戏。设有多个真人荷官桌台，包括：百家乐、竟咪、龙虎、骰宝、轮盘等多款游戏。</p><p>开云体育提供业内最好的真人场馆游戏，画面精致、输赢公平，我们用信任，帮您赢得市场；用口碑，赢得用户信赖。</p><a className="gameGo" href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer">进入游戏</a></div></div>
          <div className="gamePanel panel-chess"><img loading="lazy" decoding="async" src="/games/chess.webp" alt="开云棋牌" /><div className="gameCard"><h3>开云棋牌</h3><p>开云集团官方直营，欧洲最高级别安全认证，热门棋牌品类丰富，聆听悦耳音乐，感受非同凡响极致体验，让游戏改变生活，尽在开云棋牌。</p><p>提供市面上热门游戏种类，选择全面多元，应有尽有玩家能不断游戏不感无趣！抢庄牛牛、龙虎斗，多款棋牌任君选，好友相约竞技，游戏改变生活。精致画质、流畅体验，帮您树立良好口碑，缔造精品平台。</p><a className="gameGo" href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer">进入游戏</a></div></div>
          <div className="gamePanel panel-esport"><img loading="lazy" decoding="async" src="/games/esport.webp" alt="开云电竞" /><div className="gameCard"><h3>开云电竞</h3><p>创新电竞竞猜模式，时时滚球，独创自由串关。注单秒确认，热门赛事秒结算，独家滚球助您嗨翻全场。绝妙畅爽体验，一切竞有可能！提供所有大型赛事，每月玩家可期待超过百场比赛及上万盘口！拥有令人惊叹的视觉界面及高效的用户体验，所以能让您轻松上手，一目了然，轻松投注。</p><p>开云电竞，行业最顶尖电竞赛事平台合作商，提供最新、最热门的电竞赛事竞猜，更有最热门电竞视频及最新电竞资讯等服务，帮您塑造品牌、提升热度。</p><a className="gameGo" href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer">进入游戏</a></div></div>
          <div className="gamePanel panel-lottery"><img loading="lazy" decoding="async" src="/games/lottery.webp" alt="开云彩票" /><div className="gameCard"><h3>开云彩票</h3><p>开云彩票为您提供最便捷丰富的彩票新玩法，精彩绝伦的交互体验，连线开彩最即时，业界彩种最丰富，开启彩票新纪元，尽在开云体育官方直营“开云彩票”。</p><p>超过百种彩票玩法任您赢！开云体育为全球各彩票玩家提供了丰富多样的游戏内容，致力为玩家打造高品质的娱乐环境，安心乐享游戏空间，只为公平、公正的开奖结果。</p><p>最全面的彩种，最稳定的奖源，最丰富的玩法，最稳最快的开奖结果，是您拉新引流的最佳方式。我们还提供自研彩票，使您平台更彰显实力。</p><a className="gameGo" href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer">进入游戏</a></div></div>
          <div className="gamePanel panel-slot"><img loading="lazy" decoding="async" src="/games/slot.webp" alt="开云电子" /><div className="gameCard"><h3>开云电子</h3><p>AG捕鱼、PG电子等一直是行业火热的游戏供应商，开云体育携手多家厂商强强联手，将帮您最快速缔造自己的电子游艺平台，上百款游戏任由用户选择。</p><p>开云体育提供各类经典老虎机游戏、刮刮乐、棋牌、街机等游戏，更多免费游戏，爆分大会你来。</p><a className="gameGo" href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer">进入游戏</a></div></div>
        </div>
      </div></section>

      <section id="policy" className="light"><div className="wrap split">
        <div><p className="eyebrow blue">POLICY & SETTLEMENT</p><h2>开云体育代理招商</h2><p className="sub">合作前先把规则说清楚。佣金比例、有效业绩和结算周期，应以双方当前确认的合作方案为准。</p><div className="policyBtns policyStack"><a className="btn" href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">TG：@a8802717</a><a className="btn" href="/commission">查看详情</a></div></div>
        <PolicyZoom />
      </div></section>

      <section id="faq" className="faq"><div className="wrap">
        <p className="eyebrow">FAQ</p><h2>常见问题</h2>
        {[
          ['浏览本站需要下载开云APP吗？','看首页、游戏介绍和合作说明，用手机或电脑浏览器即可。需要安装客户端时，再到开云APP下载里选择对应版本。'],
          ['开云全站APP、开云体育APP、开云真人APP和登录器有什么区别？','全站APP包含体育、电竞、真人、彩票和电子。体育APP侧重赛事竞猜，真人APP侧重真人视讯。登录器用于在 Windows、Mac 和 Android 上打开网页版。'],
          ['想成为开云代理，从哪里开始？','个人或已有推广渠道的团队，可以通过本页 Telegram：@a8802717 说明现有资源和合作意向。合作方式以双方确认的方案为准。'],
          ['开云代理的佣金和活动以哪份说明为准？','结算周期、考核条件和活动奖励，先看开云代理招商页，再以双方确认的最新方案为准。活动期限和参与要求可能调整。'],
          ['开云游戏有哪些类型？','首页列出的游戏有开云体育、开云真人、开云棋牌、开云电竞、开云彩票和开云电子。'],
          ['还有问题可以找谁？','合作相关可联系 Telegram：@a8802717，小助手Telegram：@kytyk。']
        ].map(x=><details key={x[0]}><summary>{x[0]}<b>＋</b></summary><p>{x[1]}</p></details>)}
      </div></section>

      <section id="service" className="service"><div className="wrap">
        <p className="eyebrow blue">QUALITY SERVICE</p>
        <h2 className="clientTitle">优质服务</h2>
        <ServiceGauges />
        <ul className="svcList">
          <li><i className="svcIcon speed"></i><div><h3>极速存取转款</h3><p>最新技术自主研发的财务处理系统真正做到极速存、取、转独家网络优化技术，为您提供一流的游戏体验，最大优化网络延迟。</p></div></li>
          <li><i className="svcIcon match"></i><div><h3>海量赛事种类</h3><p>每天为您提供近千场精彩体育赛事，更有真人、彩票、电子游戏等多种娱乐方式选择，让您拥有完美游戏体验。</p></div></li>
          <li><i className="svcIcon lock"></i><div><h3>加密安全管理</h3><p>独家开发，采用128位加密技术和严格的安全管理体系，客户资金得到最完善的保障，让您全情尽享娱乐、赛事投注、无后顾之忧！</p></div></li>
          <li><i className="svcIcon device"></i><div><h3>三端任您选择</h3><p>引领市场的卓越技术，自主研发了全套终端应用，让您随时随地，娱乐投注随心所欲！7x24小时在线客服提供最贴心、最优质的服务。</p></div></li>
        </ul>
      </div></section>

      <section id="contact" className="cta"><div className="wrap">
        <p className="eyebrow">WANT TO KNOW MORE?</p><h2>想进一步了解代理合作？</h2><p>联系锦鲤，了解当前合作方式与业务方向。</p>
        <div className="ctaJoin"><a href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">Telegram：@a8802717</a><span></span><a href="https://t.me/kytyk" target="_blank" rel="noopener noreferrer">助手TG：@kytyk</a></div>
      </div></section>

      <footer><div className="partners">{Array.from({length:15},(_,i)=>{const n=String(i+1).padStart(2,'0');return <span className="partner" key={n}><img loading="lazy" decoding="async" className="off" src={`/partners/${n}-off.webp`} alt="" /><img loading="lazy" decoding="async" className="on" src={`/partners/${n}-on.webp`} alt="" /></span>})}</div><div className="license"><div className="licenseMarks"><img loading="lazy" decoding="async" src="/license/mga.webp" alt="MGA" /><img loading="lazy" decoding="async" src="/license/bvi.webp" alt="BVI" /></div><p>开云体育拥有欧洲马耳他（MGA）颁发的合法执照。<br/>注册于英属维尔京群岛，是受国际行业协会认可的合法公司。进行注册并娱乐前，请确保您年满18周岁！</p></div><div className="wrap foot">
        <div className="footBrand"><a className="brand" href="/" aria-label="KAIYUN.SI"><img loading="lazy" decoding="async" src="/logo.webp" alt="开云体育 kaiyun.si" style={{height:46,width:'auto',display:'block'}} /></a><p>代理合作 · 行业资讯 · 长期内容</p></div>
        <div><b>内容</b><a href="/cooperation">开云APP下载</a><a href="/commission">开云代理招商</a><a href="/news">开云新闻资讯</a></div>
        <div><b>联系</b><a href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">Telegram1</a><a href="https://t.me/kytyk" target="_blank" rel="noopener noreferrer">Telegram2</a></div>
      </div><div className="copy" style={{border:"none",borderTop:"none",boxShadow:"none"}}>© 2026 KAIYUN.SI · 本站仅提供合作与行业信息，具体政策以实际确认内容为准。</div></footer>
    </main>
  );
}
