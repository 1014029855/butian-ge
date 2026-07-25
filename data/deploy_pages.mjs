// 再部署脚本：通过 GitHub REST API 把 web/dist 发布到 gh-pages 分支并启用 Pages。
// 背景：本机到 github.com 的 git 推送链路不稳定，但 api.github.com 可达。
// 用法（在仓库根执行，凭据取自 git credential fill 或手动 export）：
//   GITHUB_TOKEN=<pat> node data/deploy_pages.mjs web/dist 1014029855/butian-ge gh-pages
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const [distDir, repo, branch] = process.argv.slice(2);
if (!distDir || !repo || !branch) {
  console.error("usage: node data/deploy_pages.mjs <distDir> <owner/repo> <branch>");
  process.exit(1);
}
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("需要环境变量 GITHUB_TOKEN");
  process.exit(1);
}
const API = "https://api.github.com";
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
  "X-GitHub-Api-Version": "2022-11-28",
};

async function api(method, path, body) {
  const r = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await r.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  if (!r.ok) throw new Error(`${method} ${path} -> ${r.status}: ${text.slice(0, 300)}`);
  return json;
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else if (st.isFile()) yield p;
  }
}

const files = [...walk(distDir)];
console.log(`dist 文件数: ${files.length}`);

// 1) 逐文件建 blob
const tree = [];
for (const abs of files) {
  const rel = relative(distDir, abs).replaceAll("\\", "/");
  const content = readFileSync(abs).toString("base64");
  const blob = await api("POST", `/repos/${repo}/git/blobs`, { content, encoding: "base64" });
  tree.push({ path: rel, mode: "100644", type: "blob", sha: blob.sha });
  console.log(`blob ${rel} -> ${blob.sha.slice(0, 8)}`);
}

// 2) 建 tree
const treeRes = await api("POST", `/repos/${repo}/git/trees`, { tree });
console.log(`tree -> ${treeRes.sha.slice(0, 8)}`);

// 3) 查旧 tip（存在则作 parent，实现增量历史）
let parents = [];
try {
  const ref = await api("GET", `/repos/${repo}/git/ref/heads/${branch}`);
  parents = [ref.object.sha];
  console.log(`旧 tip ${ref.object.sha.slice(0, 8)}（作为 parent）`);
} catch {
  console.log("分支不存在，创建无 parent 的首个提交");
}

// 4) 建 commit
const msg = `deploy: dist build ${new Date().toISOString().slice(0, 19).replace("T", " ")}`;
const commit = await api("POST", `/repos/${repo}/git/commits`, { message: msg, tree: treeRes.sha, parents });
console.log(`commit -> ${commit.sha.slice(0, 8)}`);

// 5) 更新/创建 ref
try {
  await api("PATCH", `/repos/${repo}/git/refs/heads/${branch}`, { sha: commit.sha, force: true });
  console.log(`ref 更新 refs/heads/${branch}`);
} catch {
  await api("POST", `/repos/${repo}/git/refs`, { ref: `refs/heads/${branch}`, sha: commit.sha });
  console.log(`ref 创建 refs/heads/${branch}`);
}

// 6) 启用 Pages（source: 该分支根目录）
try {
  const pages = await api("POST", `/repos/${repo}/pages`, { source: { branch, path: "/" } });
  console.log(`Pages 已启用: ${pages.html_url}`);
} catch (e) {
  if (String(e.message).includes("409") || String(e.message).includes("already exists")) {
    console.log("Pages 已存在（沿用现有配置）");
  } else {
    throw e;
  }
}
console.log("完成。站点将在一两分钟后构建可见。");
