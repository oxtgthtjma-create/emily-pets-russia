# 验证记录

2026-10-27，本地 Next.js 16.4.3 / React 19 / npm。

- npm install：成功，审计 0 vulnerabilities。
- npm run build：成功；4 个业务页面、404、robots、sitemap 静态生成。
- npm run typecheck：成功。
- git diff --check：成功；首次空仓库文件均为新文件，该命令不替代代码检查。
- 检查生成的 4 个业务 HTML：lang=ru、noindex、每页一个 H1 均通过。
- 本地服务在沙箱内报告 3018 ready；IAB 分别访问 localhost 和 127.0.0.1 失败。
- PowerShell HTTP 请求被沙箱套接字权限拒绝；已申请沙箱外 HTTP 检查与启动权限。

未完成：实际浏览器截图、390/820/1440 响应式检查、导航点击、表单必填与 JSON 下载验证、逐路由 HTTP。不能用构建通过替代这些验证。

未部署。当前文件生成工具不会向服务器提交数据；尚未实现生产询价接收、销售通知或 CRM。
