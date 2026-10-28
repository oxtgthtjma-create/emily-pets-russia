# Основания доверия и документы / 权威背书依据

2026-10-28。用户明确要求设置权威背书，并指定参考 emilypets.com。

来源：主站 about-us 的公司身份、2000年成立和品牌关系属于公司自述。公开产品规格仍以各产品页为依据。Qian Hu 独立商品记录只证明其网站出现该商品，未据此声称授权经销、客户评价或合作背书。

主站实际公开图片逐张读取（没有修改原图、伪造标志、生成证书）：

- CERTIFICATION.jpg：Alibaba.com Gold Plus Supplier Assessment Certificate；Puyuan (Dalian) Pet Products Co., Ltd.；SGS现场评估；483522203_T；图示有效期2026-01-14至2027-01-13。只按图披露，未独立查询发行方当前状态，不视为产品质量证书。
- SGS-1.jpg：Tofu Cat Litter 的SDS首页；DLF26-0003626-01A；Inspection Date2026-02-14，签字2026-02-25；主体Puyuan，SGS-CSTC Qingdao；USA OSHA HCS2024范围不等于俄罗斯法规符合性。
- MSDS-1.jpg：PTC MSDS，Cat Litter，2025-03-11，第1/9页；未把首页当作完整报告。
- sedex_-1.jpg：SMETA CAPR v7封面，没有可核对的具体工厂、日期或结果；不声称审核通过。

图片来源均 https://emilypets.com/wp-content/uploads/2026/09/ 原文件名。复制至 public/documents，保留完整图与原图来源链接。没有从原图裁出标志充当网站认证徽章。

官方核验背景：ISO certification页面说明ISO本身不发证；SGS Certified Client Directory；amfori公开材料说明BSCI不是质量认证体系；Sedex官方SMETA方法及Introduction to SMETA说明非证书和pass/fail模型。按文件本来用途区分，不把MSDS、审核、管理体系认证混为一谈。

实现：首页与公司页来源卡片、/trust 文件图集和请求入口、页脚导航；Organization结构化数据只写公开公司实体、地址、电话邮箱和品牌，不填hasCredential、评分、合作伙伴或认证标志。保持原noindex。

验证记录：类型检查与最终生产构建通过；/trust 4张文件图实际加载、可放大；5类文件说明可展开；邮件请求为真实 mailto且未自动发送；Organization JSON可解析。1440/390/820布局无横向溢出。主页实际显示3张来源卡，含供应商评估编号。原有未跟踪截图 docs/deployed-home.png 保留。
