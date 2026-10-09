import fs from "node:fs";
import path from "node:path";

const seed = path.join(process.cwd(), "data", "posts.json");

function file() {
  const mount = process.env.RAILWAY_VOLUME_MOUNT_PATH;
  return mount ? path.join(mount, "posts.json") : seed;
}

const legacyIds = {
  "app-which-one": "1",
  "agent-before-apply": "2",
  "faq-three": "3",
};

function numerate(posts) {
  let changed = false;
  const staged = posts.map((post) => {
    const id = legacyIds[post.id];
    if (!id) return post;
    changed = true;
    return { ...post, id };
  });
  let max = 0;
  for (const post of staged) {
    if (/^[1-9]\d*$/.test(post.id)) max = Math.max(max, Number(post.id));
  }
  const seen = new Set();
  const next = staged.map((post) => {
    let id = String(post.id || "");
    if (!/^[1-9]\d*$/.test(id) || seen.has(id)) {
      max += 1;
      id = String(max);
      changed = true;
    }
    seen.add(id);
    return id === post.id ? post : { ...post, id };
  });
  return { posts: next, changed };
}

function applyNewsPatches(posts) {
  const patches = {
    "4": {
      match: "开云体育十月代理佣金派发将于10月8日开始",
      excerpt: "2026年10月8日至15日可以申请十月佣金。申请前要先完成发佣验证，页面显示已验证后再点佣金申请。",
      body: [
        "2026年10月8日至15日可以申请十月佣金。申请前要先完成发佣验证，页面显示「已验证」后再点「佣金申请」。验证步骤见[后台发佣验证操作指南](/news/5)。",
        "佣金如何申请？",
        "进入代理后台后，查看本期佣金金额，点击“佣金申请”，根据页面提示提交。提交前，请核对账户及申请信息，确认无误后再完成操作。",
        "提交后如何查看进度？",
        "佣金申请提交后，将进入审核流程。代理可在后台查看申请状态，等待审核通过后派发。如页面提示需要补充信息，请按要求完善；具体审核进度及到账情况，以后台显示为准。",
        "佣金到账后如何提现？",
        "确认佣金已到账后，可进入相应提现页面，按提示申请提现至本人钱包。提交前，请仔细核对钱包收款信息，避免因填写错误影响到账。",
        "本次流程为：登录后台，在佣金报表完成发佣验证，再点击佣金申请，等待审核通过并派发，到账后申请提现至本人钱包。请代理留意10月8日至15日的派发时段，及时查看并办理。",
      ].join("\n\n"),
    },
    "5": {
      match: "请各位代理在佣金派发前，登录开云体育代理后台完成发佣验证",
      excerpt: "十月佣金的申请时间是2026年10月8日至15日。派发前必须先在佣金报表完成发佣验证，页面显示已验证后再申请。",
      body: [
        "十月佣金的申请时间是10月8日至15日。派发前必须先在「佣金报表」右上方完成「发佣验证」。申请入口见[十月代理佣金派发通知](/news/4)。",
        "第一步：进入佣金报表",
        "登录代理后台，点击“佣金报表”，进入相应页面。",
        "第二步：点击发佣验证",
        "在佣金报表页面右上方找到“发佣验证”，点击进入验证流程。",
        "第三步：按提示填写信息",
        "按照页面提示输入所需信息，核对无误后提交。具体填写内容以后台页面要求为准。",
        "第四步：确认显示已验证",
        "提交后查看验证状态。页面显示“已验证”，即表示本次发佣验证已完成；如未显示，请根据页面提示检查是否还有未完成的操作。",
        "请注意，“已验证”表示验证流程完成，佣金是否已派发及到账，请另行查看后台相关记录。",
      ].join("\n\n"),
    },
  };
  let changed = false;
  const next = posts.map((post) => {
    const patch = patches[String(post.id)];
    if (!patch || !String(post.body || "").includes(patch.match)) return post;
    changed = true;
    return { ...post, excerpt: patch.excerpt, body: patch.body };
  });
  return { posts: next, changed };
}

function read() {
  const target = file();
  try {
    if (!fs.existsSync(target) && target !== seed && fs.existsSync(seed)) {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(seed, target);
    }
    const data = JSON.parse(fs.readFileSync(target, "utf8"));
    const posts = Array.isArray(data.posts) ? data.posts : [];
    const numbered = numerate(posts);
    const patched = applyNewsPatches(numbered.posts);
    if (numbered.changed || patched.changed) write(patched.posts);
    return patched.posts;
  } catch {
    return [];
  }
}

function write(posts) {
  const target = file();
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify({ posts }, null, 2));
}

export function mediaDir() {
  return path.join(path.dirname(file()), "uploads");
}

export function saveMedia(bytes, ext) {
  const name = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const dir = mediaDir();
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), bytes);
  return `/api/media/${name}`;
}

export function mediaFile(name) {
  if (!/^[a-z0-9]+\.(jpg|png|webp|gif)$/.test(name)) return "";
  const target = path.join(mediaDir(), name);
  return target.startsWith(mediaDir()) && fs.existsSync(target) ? target : "";
}

export function safeImage(url) {
  const value = String(url || "").trim();
  if (/^\/api\/media\/[a-z0-9]+\.(jpg|png|webp|gif)$/.test(value)) return value;
  if (/^https:\/\/\S+$/.test(value)) return value;
  return "";
}

export function listPosts() {
  return read().sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
}

export function getPost(id) {
  return read().find((post) => post.id === id) || null;
}

export function savePost(input) {
  const posts = read();
  const title = String(input.title || "").trim().slice(0, 80);
  const excerpt = String(input.excerpt || "").trim().slice(0, 180);
  const body = String(input.body || "").trim().slice(0, 20000);
  const category = input.category === "招商活动" ? "招商活动" : "新闻资讯";
  const publishedAt = Number.isNaN(Date.parse(input.publishedAt)) ? new Date().toISOString() : new Date(input.publishedAt).toISOString();
  if (!title || !body) throw new Error("标题和正文不能为空");
  let id = String(input.id || "").trim();
  if (!/^[1-9]\d{0,5}$/.test(id)) {
    const max = posts.reduce((highest, post) => Math.max(highest, Number(post.id) || 0), 0);
    id = String(max + 1);
  }
  const cover = safeImage(input.cover);
  const next = { id, title, excerpt: excerpt || body.slice(0, 72), body, category, publishedAt, cover };
  const index = posts.findIndex((post) => post.id === id);
  if (index >= 0) posts[index] = next;
  else posts.push(next);
  write(posts);
  return next;
}

export function deletePost(id) {
  write(read().filter((post) => post.id !== id));
}
