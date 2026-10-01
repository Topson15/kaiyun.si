import SiteHeader from "./site-header";
import ServiceGauges from "./service-gauges";
function AppAccess(){return <div className="appGet"><div className="qrBox"><img src="/app-qr.png" alt="" /><b>扫码下载</b><span>支持iOS&Android</span></div><div className="directBox"><a href="https://www.s49tye.vip:9973" target="_blank" rel="noopener noreferrer">https://www.s49tye.vip:9973</a><a href="https://www.vefq9z.vip:9192" target="_blank" rel="noopener noreferrer">https://www.vefq9z.vip:9192</a><b>直接访问</b><span>无需下载，手机输入网址即可</span></div></div>}

const articles = [
  ['代理合作前，先确认哪几件事？', '合作指南'],
  ['代理佣金通常看哪些数据？', '佣金政策'],
  ['如何规划长期推广渠道？', '经营经验']
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <div className="glow"></div>
        <div className="wrap heroGrid">
          <div>
            <h1>开云体育官方<br/><em>代理合作</em></h1>
            <p className="eyebrow"><span className="domName">kaiyun</span><span className="domDot">.</span><span className="domTld">si</span></p>
            <p className="lead">了解代理合作、佣金政策、结算规则与推广方向。把常用合作信息集中整理，让合作更清晰、更简单。</p>
            <div className="actions">
              <a className="btn" href="http://5257y.com/" target="_blank" rel="noopener noreferrer">开云体育注册</a>
              <a className="ghost heroSecondBtn" href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">了解代理合作</a>
            </div>
          </div>
          <div className="heroStage">
            <div className="heroArtWrap">
              <img className="heroArtEdge" src="/hero-art.png" alt="" />
              <img className="heroArt" src="/hero-art.png" alt="" />
            </div>
            <div className="heroReflect" aria-hidden="true"><img src="/hero-art.png" alt="" /></div>
          </div>
        </div>
      </section>

      <section id="insights" className="client"><div className="wrap">
        <p className="eyebrow blue">APP DOWNLOAD</p>
        <h2 className="clientTitle">APP下载</h2>
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
          <img className="clientArt art-all" src="/app-all.png" alt="" />
          <img className="clientArt art-sport" src="/app-sport.png" alt="" />
          <img className="clientArt art-live" src="/app-live.png" alt="" />
          <img className="clientArt art-login" src="/login-client.png" alt="" />
          </div>
          <div className="clientCopy panel-all"><h3>全站APP</h3><p>全球首家一体化娱乐原生APP，尽显流畅，完美操作。海量体育、电竞顶尖赛事，真人娱乐、彩票投注及电子游艺等，最新最全娱乐项目尽在掌中体验扫码下载，即刻拥有！</p><AppAccess /></div>
          <div className="clientCopy panel-sport"><h3>体育APP</h3><p>业内赔率最高！覆盖世界各地赛事，让球、大小、半全场、波胆、单双、总入球、连串过关等多元竞猜。更有动画直播，让您体验轻松聊球，娱乐投注两不误。</p><AppAccess /></div>
          <div className="clientCopy panel-live"><h3>真人APP</h3><p>最美荷官在线互动，带您玩转百家乐、骰宝、轮盘、牛牛、炸金花等多款真人视讯游戏。国际标准、公平公正，极致享受尽在开云真人。</p><AppAccess /></div>
          <div className="clientCopy panel-login">
            <h3>官方登录器</h3>
            <p>开云倾情打造，自主开发防劫持安全登录器。<br/>登录器支持 Windows｜MAC｜Android系统平台，使用登录器可直接访问开云WEB站点，有效防御和避免站点被拦截/劫持等问题。登录器安装简单，能给玩家提供安全的游戏环境体验！</p>
            <div className="downloads">
              <a href="http://5257y.com/" target="_blank" rel="noopener noreferrer"><i className="os win"></i><span>Windows 版本</span><b>下载</b></a>
              <a href="http://5257y.com/" target="_blank" rel="noopener noreferrer"><i className="os mac"></i><span>MacOS 版本</span><b>下载</b></a>
              <a href="http://5257y.com/" target="_blank" rel="noopener noreferrer"><i className="os android"></i><span>Android 版本</span><b>下载</b></a>
            </div>
          </div>
        </div>
      </div></section>

      <section className="dark darkSlot" aria-label="待添加内容"></section>

      <section id="policy" className="light"><div className="wrap split">
        <div><p className="eyebrow blue">POLICY & SETTLEMENT</p><h2>佣金 · 政策 · 结算</h2><p className="sub">合作前先把规则说清楚。佣金比例、有效业绩和结算周期，应以双方当前确认的合作方案为准。</p><a className="btn" href="#contact">咨询当前合作政策</a></div>
        <div className="policy"><div><b>01</b><h3>佣金政策</h3><p>了解核算逻辑与适用比例。</p></div><div><b>02</b><h3>有效业绩</h3><p>确认纳入核算的数据范围。</p></div><div><b>03</b><h3>结算周期</h3><p>明确周期、数据与结算条件。</p></div></div>
      </div></section>

      <section id="faq" className="faq"><div className="wrap">
        <p className="eyebrow">FAQ</p><h2>常见问题</h2>
        {[
          ['如何了解代理合作？','先确认业务方向、推广渠道和合作需求，再沟通当前适用的合作方案。'],
          ['佣金如何计算？','不同合作模式可能不同，应以当前确认的佣金比例、有效业绩及结算规则为准。'],
          ['可以推广哪些方向？','可根据实际合作范围了解体育、真人、电子等方向。'],
          ['合作政策会调整吗？','可能根据业务和合作方案调整，实际执行以当期双方确认内容为准。']
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
        <p className="eyebrow">WORK WITH JINLI</p><h2>想进一步了解代理合作？</h2><p>联系锦鲤，了解当前合作方式与业务方向。</p>
        <a className="btn gold" href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">Telegram：@a8802717</a>
      </div></section>

      <footer><div className="partners">{Array.from({length:15},(_,i)=>{const n=String(i+1).padStart(2,'0');return <span className="partner" key={n}><img className="off" src={`/partners/${n}-off.png`} alt="" /><img className="on" src={`/partners/${n}-on.png`} alt="" /></span>})}</div><div className="license"><div className="licenseMarks"><img src="/license/mga.png" alt="MGA" /><img src="/license/bvi.png" alt="BVI" /></div><p>开云体育拥有欧洲马耳他（MGA）颁发的合法执照。<br/>注册于英属维尔京群岛，是受国际行业协会认可的合法公司。进行注册并娱乐前，请确保您年满18周岁！</p></div><div className="wrap foot">
        <div><a className="brand" href="/" aria-label="KAIYUN.SI"><img src="/logo.png" alt="开云体育 kaiyun.si" style={{height:46,width:'auto',display:'block'}} /></a><p>代理合作 · 行业资讯 · 长期内容</p></div>
        <div><b>内容</b><a href="#policy">代理合作</a><a href="#policy">佣金政策</a><a href="#insights">行业资讯</a></div>
        <div><b>联系</b><a href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">Telegram</a><span>@a8802717</span></div>
      </div><div className="copy" style={{border:"none",borderTop:"none",boxShadow:"none"}}>© 2026 KAIYUN.SI · 本站仅提供合作与行业信息，具体政策以实际确认内容为准。</div></footer>
    </main>
  );
}
