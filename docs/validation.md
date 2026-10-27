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

## 俄罗斯参考站改版复核（2026-10-27 后续记录）

初版后来已部署到 emily-pets-russia.vercel.app。本次在该项目上更新设计，上方的未部署和连接受阻属于初版历史记录。

- 最终生产构建与 TypeScript 通过。四个业务页面、robots、sitemap 正常生成。
- HTTP：/、/assortment、/project?category=bedding、/about、robots.txt、sitemap.xml 均 200。
- 使用连接的 Chrome / cua_repl，检查 1586×992（设计稿原尺寸）、1440×1000、820×1180、390×844；未使用独立 Playwright 浏览器替代。
- lang=ru、noindex/follow、自指 canonical 为实际 Vercel 默认域名。sitemap 保持空，等待专业俄语审核。
- 手机首页、类别、关于页、表单无横向溢出；已修正手机猫脸裁切、平板 CTA 压图和导航后菜单未关闭。
- FAQ 展开显示“不自动发送”；类别链接正确预选；空表单原生校验聚焦必填 items。
- TXT 和 JSON 已实际下载，读取测试文件核对垫料类别、测试规格和数量 250。
- 已看控制台，无相关 error/warn；无框架错误覆盖层。
- view_image 对照设计稿与实际截图，核对文案、层级、布局、颜色、图片、图标、按钮、圆角和响应式。
- 有意差异：系统字体、实际业务流程图标；移除单语站的语言下拉；不采用设计图虚构的饲料/博客/报价承诺；小屏上下布局。
- 生产状态以 Vercel Ready 和线上页面为准。仍未接入询价接收和销售通知，下载在浏览器生成。
