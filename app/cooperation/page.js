import PageFrame from "../page-frame";

export const metadata = {
  title: "开云APP下载",
  description: "开云全站APP、体育APP、真人APP和登录器下载。",
  alternates: { canonical: "/cooperation" },
  openGraph: {
    url: "/cooperation",
    title: "开云APP下载｜KAIYUN.SI",
    description: "开云全站APP、体育APP、真人APP和登录器下载。",
  },
};

function AppAccess({ qr, alt }) {
  return (
    <div className="appGet">
      <div className="qrBox"><img loading="lazy" decoding="async" src={qr} alt={alt} /><b>扫码下载</b><span>支持iOS&Android</span></div>
      <div className="directBox"><a href="http://5257y.com/" target="_blank" rel="sponsored noopener noreferrer">http://5257y.com/</a><b>直接访问</b><span>无需下载，手机输入网址即可</span><span>请用国内网络打开即可</span></div>
    </div>
  );
}

export default function CooperationPage() {
  return (
    <PageFrame>
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
          <div className="clientCopy panel-all"><h3>全站APP</h3><p>全球首家一体化娱乐原生APP，尽显流畅，完美操作。海量体育、电竞顶尖赛事，真人娱乐、彩票投注及电子游艺等，最新最全娱乐项目尽在掌中体验扫码下载，即刻拥有！</p><AppAccess qr="/app-qr-all-2.webp" alt="开云全站APP下载二维码" /></div>
          <div className="clientCopy panel-sport"><h3>体育APP</h3><p>业内赔率最高！覆盖世界各地赛事，让球、大小、半全场、波胆、单双、总入球、连串过关等多元竞猜。更有动画直播，让您体验轻松聊球，娱乐投注两不误。</p><AppAccess qr="/app-qr-sport-2.webp" alt="开云体育APP下载二维码" /></div>
          <div className="clientCopy panel-live"><h3>真人APP</h3><p>最美荷官在线互动，带您玩转百家乐、骰宝、轮盘、牛牛、炸金花等多款真人视讯游戏。国际标准、公平公正，极致享受尽在开云真人。</p><AppAccess qr="/app-qr-live-2.webp" alt="开云真人APP下载二维码" /></div>
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
    </PageFrame>
  );
}
