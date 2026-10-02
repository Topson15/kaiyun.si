import './globals.css';
import SupportWidget from './support-widget';
import CopyGuard from './copy-guard';
export const metadata={metadataBase:new URL('https://kaiyun.si'),title:{default:'开云体育官方网站',template:'%s｜KAIYUN.SI'},description:'代理合作、佣金政策、推广经验与行业资讯。',icons:{icon:'/favicon.png',apple:'/favicon.png'},openGraph:{siteName:'KAIYUN.SI',locale:'zh_CN',type:'website',images:[{url:'/og.jpg',width:1200,height:630,alt:'开云体育官方网站'}]},twitter:{card:'summary_large_image',images:['/og.jpg']}};
export default function RootLayout({children}){return <html lang="zh-CN"><body>{children}<SupportWidget /><CopyGuard /></body></html>}
