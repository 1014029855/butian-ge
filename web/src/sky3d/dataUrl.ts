/**
 * 数据资源 URL：以 vite BASE_URL 为前缀（本工程 base "./"，即相对当前页面目录）。
 * 兼容 GitHub Pages 子路径部署（/butian-ge/）与开发服务器根路径。
 * 禁止手写 "/data/..." 绝对路径——子路径部署时会跳出站点目录导致 404。
 */
export function dataUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}
