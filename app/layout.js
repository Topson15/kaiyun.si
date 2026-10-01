import './globals.css';
import SupportWidget from './support-widget';
export const metadata={metadataBase:new URL('https://kaiyun.si'),title:{default:'KAIYUN.SI｜代理合作与行业资讯',template:'%s｜KAIYUN.SI'},description:'代理合作、佣金政策、推广经验与行业资讯。',alternates:{canonical:'/'},openGraph:{title:'KAIYUN.SI',description:'代理合作、佣金政策、推广经验与行业资讯。',url:'https://kaiyun.si',siteName:'KAIYUN.SI',locale:'zh_CN',type:'website'}};
export default function RootLayout({children}){return <html lang="zh-CN"><head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;700&display=swap" /></head><body>{children}<SupportWidget /></body></html>}
