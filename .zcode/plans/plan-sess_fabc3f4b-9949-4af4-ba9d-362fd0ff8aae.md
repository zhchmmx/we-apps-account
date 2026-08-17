# Dashboard 新增「AI 使用」Tab

在 dashboard 中新增一个 Tab，调用 `https://api.08012026.xyz/usage` 获取当月 AI 使用数据，按 cost 对 $5 月度额度显示进度条。

**认证方式（按最佳判断，未被用户确认）**：与 `checkout.08012026.xyz` 相同 —— `account.createJWT()` 生成 JWT，`Authorization: Bearer ${token}` 请求头。依据：不带认证实测返回 404，且为同域名族、沿用项目已有模式。

API 响应格式：`{ data: { month: "2026-08", requests: 42, cost: 0.1537, tokensIn: 84210, tokensOut: 12650 } }`

## 修改文件

### 1. `dashboard.html`

**侧边栏导航**：在「订阅管理」导航项后（账户 section 内）新增：
```html
<a class="nav-item" data-tab="usage" onclick="switchTab('usage')">
  <span class="icon">📊</span> <span data-i18n="nav.usage">AI 使用</span>
</a>
```

**Tab section**：在 `#tab-subscription` 后新增 `#tab-usage`：
- 卡片标题「本月 AI 使用」，header badge 显示月份（如 2026-08）
- 进度条区：文字行 `$0.15 / $5.00 · 3.1%` + 进度条
- `info-grid` 统计：请求数、已花费、输入 Tokens、输出 Tokens、剩余额度

**JS 逻辑**：
- 常量：`const AI_API_BASE = 'https://api.08012026.xyz';`、`const AI_MONTHLY_QUOTA = 5;`
- `loadUsage()`：createJWT → `fetch GET ${AI_API_BASE}/usage`（Bearer 头）→ 解析 `.data` → `renderUsage(data)`；失败时卡片内显示错误文案 + 重试按钮（沿用订阅加载失败的处理模式）
- `renderUsage(data)`：`pct = cost / 5 * 100`，进度条宽度封顶 100%；颜色分级 <70% 绿（--success）、70–90% 黄（--warning）、>90% 红（--error）；动态 innerHTML 渲染，文案走 `t()`
- `switchTab` 的 `titleKeys` 增加 `usage: 'dash.title.usage'`
- `loadDashboard()` 中追加 `loadUsage()` 调用（与 sessions/identities/subscription 并列）

### 2. `css/style.css`

新增进度条样式（放在订阅样式附近）：
- `.usage-bar`：轨道，灰底（var(--bg)）、圆角、8px 高
- `.usage-bar-fill`：填充，`width: %`、transition、三个色态类 `.ok` / `.warn` / `.danger`
- `.usage-summary`：进度条上方文字行（已用 / 总额 · 百分比，两端对齐）

### 3. `js/i18n.js`

zh / en 各新增键：
- `nav.usage`（'AI 使用' / 'AI Usage'）、`dash.title.usage`（'AI 使用情况' / 'AI Usage'）
- `usage.title`（'本月 AI 使用' / 'AI Usage This Month'）、`usage.month`、`usage.quota`（'月度额度' / 'Monthly Quota'）、`usage.used`、`usage.remaining`、`usage.requests`、`usage.cost`、`usage.tokensIn`、`usage.tokensOut`、`usage.loadFailed`、`usage.retry`

## 边界情况
- cost 超过 $5：进度条封顶 100% 并显示红色，文字显示真实数值与剩余 $0.00
- 金额格式：toFixed(2)；百分比 toFixed(1)
- tokens 数值用 toLocaleString() 千分位
- 语言切换时动态内容不自动刷新（与现有 renderSubscription 行为一致，不做特殊处理）