"use client";

import { useEffect, useState } from "react";

const empty = { id: "", title: "", category: "新闻资讯", excerpt: "", body: "", publishedAt: "", cover: "" };

export default function Editor() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admin", { cache: "no-store" });
    if (!res.ok) {
      setAuthed(false);
      setReady(true);
      return;
    }
    const data = await res.json();
    setPosts(data.posts || []);
    setAuthed(true);
    setReady(true);
  }

  useEffect(() => {
    load();
  }, []);

  async function login(event) {
    event.preventDefault();
    setError("");
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ op: "login", password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "登录失败");
      return;
    }
    setPassword("");
    load();
  }

  async function save(event) {
    event.preventDefault();
    setError("");
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ op: "save", post: form }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "保存失败");
      return;
    }
    setPosts(data.posts || []);
    setForm(empty);
  }

  async function remove(id) {
    if (!window.confirm("删除这篇文章？")) return;
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ op: "delete", id }),
    });
    const data = await res.json();
    if (res.ok) setPosts(data.posts || []);
  }

  async function upload(file) {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "上传失败");
    return data.url;
  }

  async function onCover(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError("");
    try {
      setForm((current) => ({ ...current, cover: "" }));
      const url = await upload(file);
      setForm((current) => ({ ...current, cover: url }));
    } catch (err) {
      setError(err.message);
    }
  }

  async function insertImage(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError("");
    try {
      const url = await upload(file);
      setForm((current) => ({ ...current, body: `${current.body.trim()}\n\n![](${url})`.trim() }));
    } catch (err) {
      setError(err.message);
    }
  }

  async function logout() {
    await fetch("/api/admin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ op: "logout" }),
    });
    setAuthed(false);
    setPosts([]);
  }

  if (!ready) return null;

  return (
    <main className="adminPage">
      <div className="wrap narrow">
        <p className="eyebrow blue">ADMIN</p>
        <h1>开云新闻后台</h1>
        {!authed ? (
          <form onSubmit={login} className="adminCard">
            <label>后台密码<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
            {error && <p className="adminError">{error}</p>}
            <button type="submit">登录</button>
          </form>
        ) : (
          <>
            <div className="adminBar">
              <a href="/news">查看新闻页</a>
              <button type="button" onClick={logout}>退出</button>
            </div>
            <form onSubmit={save} className="adminCard">
              <label>标题<input value={form.title} maxLength={80} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
              <label>分类
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option>新闻资讯</option>
                  <option>招商活动</option>
                </select>
              </label>
              <label>日期<input type="date" value={form.publishedAt.slice(0, 10)} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} /></label>
              <label>标题图
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={onCover} />
              </label>
              {form.cover && <img loading="lazy" decoding="async" className="adminCover" src={form.cover} alt="" />}
              <label>摘要<textarea value={form.excerpt} maxLength={180} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></label>
              <label>正文<textarea className="tall" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></label>
              <label className="adminFile">插入正文图片
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={insertImage} />
              </label>
              {error && <p className="adminError">{error}</p>}
              <button type="submit">{form.id ? "保存修改" : "发布文章"}</button>
            </form>
            <ul className="adminList">
              {posts.map((post) => (
                <li key={post.id}>
                  <div>
                    <b>{post.title}</b>
                    <span>{post.category}</span>
                  </div>
                  <button type="button" onClick={() => setForm({ ...post, cover: post.cover || "" })}>编辑</button>
                  <button type="button" onClick={() => remove(post.id)}>删除</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
