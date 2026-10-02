import Editor from "./editor";

export const metadata = {
  title: "文章后台",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <Editor />;
}
