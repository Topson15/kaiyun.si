import SiteHeader from "./site-header";

export default function PageFrame({ children }) {
  return (
    <main>
      <SiteHeader />
      {children}
      <footer>
        <div className="wrap foot">
          <div className="footBrand"><a className="brand" href="/" aria-label="KAIYUN.SI"><img loading="lazy" decoding="async" width="360" height="109" src="/logo.webp" alt="开云体育 kaiyun.si" style={{ height: 46, width: "auto", display: "block" }} /></a><p><a href="https://linktr.ee/kaiyunK" target="_blank" rel="noopener noreferrer">代理合作 · 行业资讯 · 长期内容</a></p></div>
          <div><b>内容</b><a href="/cooperation">开云APP下载</a><a href="/commission">开云代理招商</a><a href="/news">开云新闻资讯</a></div>
          <div><b>联系</b><a href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">Telegram1</a><a href="https://t.me/kytyk" target="_blank" rel="noopener noreferrer">Telegram2</a></div>
        </div>
        <div className="copy">© 2026 KAIYUN.SI · 本站仅提供合作与行业信息，具体政策以实际确认内容为准。</div>
      </footer>
    </main>
  );
}
