# We Apps Account

一个简洁美观的账户登录注册管理系统，基于 Appwrite Cloud 构建。

> 一个 We Apps 账户，畅享所有 We Apps 服务

## 功能特性

### 认证功能
- **登录** — 电子邮件 + 密码登录
- **注册** — 创建新账户，支持密码强度检测
- **找回密码** — 通过邮箱发送重置链接
- **邮箱验证** — 验证用户邮箱地址

### 账户管理
- **个人信息** — 查看和修改姓名、邮箱、密码、手机号
- **安全设置** — 密码管理、邮箱验证
- **活跃会话** — 查看和管理所有登录会话
- **安全日志** — 查看账户活动记录
- **多因素认证 (MFA)** — 启用/禁用 MFA，TOTP 验证器，恢复代码
- **偏好设置** — 自定义账户偏好（JSON 键值对）
- **关联身份** — 查看第三方关联身份
- **危险操作** — 禁用或删除账户

## 技术栈

- 纯静态 HTML/CSS/JavaScript（无构建工具）
- [Appwrite Web SDK](https://github.com/appwrite/sdk-for-web) — 后端即服务
- Inter 字体 — 现代排版
- 响应式设计 — 适配桌面和移动端

## 快速开始

### 1. 配置 Appwrite

编辑 `js/config.js`，填入你的 Appwrite Cloud 凭据：

```javascript
const APPWRITE_CONFIG = {
  endpoint: 'https://cloud.appwrite.io/v1',  // 你的 endpoint
  projectId: 'your-project-id'               // 你的 project ID
};
```

### 2. 在 Appwrite Console 中配置

1. 创建项目并获取 Project ID
2. 在 **Settings > Platforms** 中添加你的域名（如 `http://localhost:5500`）
3. 确保 Authentication 服务已启用
4. 根据需要配置邮箱验证模板

### 3. 运行

由于是纯静态网站，任何 HTTP 服务器均可：

```bash
# 方式一：Python
python -m http.server 5500

# 方式二：Node.js
npx serve .

# 方式三：VS Code Live Server 扩展
```

然后在浏览器中访问 `http://localhost:5500`

## 项目结构

```
we-apps-account/
├── index.html          # 登录页面
├── register.html       # 注册页面
├── forgot.html         # 找回密码页面
├── verify.html         # 邮箱验证页面
├── dashboard.html      # 账户管理仪表盘
├── css/
│   └── style.css       # 全局样式
├── js/
│   ├── config.js       # Appwrite 配置（需修改）
│   └── app.js          # 公共工具函数
├── assets/
│   └── We.png          # Logo 图片
├── .gitignore
└── README.md
```

## 页面说明

| 页面 | 路径 | 说明 |
|------|------|------|
| 登录 | `index.html` | 邮箱+密码登录，支持"记住我" |
| 注册 | `register.html` | 创建账户，含密码强度指示器 |
| 找回密码 | `forgot.html` | 发送重置邮件 + 设置新密码 |
| 邮箱验证 | `verify.html` | 输入验证码完成邮箱验证 |
| 仪表盘 | `dashboard.html` | 完整的账户管理界面 |

## 客户端免登集成（JWT）

桌面客户端中已登录的用户，点击"账户管理"按钮即可打开浏览器并自动登录本站点。

### 1. 在 Appwrite Console 中开启 JWT

**Auth → Security → JWT** 中启用 JWT 认证（默认关闭）。

### 2. 客户端拼接并打开网址

```
https://<你的域名>/dashboard.html?jwt=<JWT>
```

客户端代码示例：

```dart
// Flutter
final jwt = await account.createJWT();
final url = 'https://your-domain/dashboard.html?jwt=${Uri.encodeComponent(jwt.jwt)}';
await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
```

```javascript
// Electron / Node 环境（appwrite Web SDK）
const jwt = await account.createJWT();
const url = `https://your-domain/dashboard.html?jwt=${encodeURIComponent(jwt.jwt)}`;
shell.openExternal(url);
```

### 3. 工作原理与限制

- 网页端解析 `jwt` 参数后**立即从地址栏抹除**，然后 `client.setJWT(jwt)` 完成认证
- ⚠️ JWT 有效期 **15 分钟**，过期后需从客户端重新打开
- ⚠️ JWT 不落盘持久化，**刷新页面会掉线**（掉线后回到登录页）
- ⚠️ JWT 不产生独立会话：网页端的"退出登录"只做页面跳转，**不会**影响客户端的登录状态
- ⚠️ JWT 依附于客户端会话：客户端退出登录后，网页端 JWT 立即失效

## 设计说明

- 对标 Adobe、Autodesk、Microsoft 等现代企业级界面风格
- 左右分栏布局（登录/注册页），左侧品牌展示，右侧表单
- 仪表盘采用侧边栏导航 + 内容区布局
- 红色主色调（#C62828），与 We Apps 品牌一致
- 平滑动画过渡、Toast 通知、模态确认框
- 完整的响应式适配

## 安全说明

- 使用 Appwrite 客户端 SDK，无需 API Key
- 密码最少 8 位，前端提供强度检测
- 修改邮箱/密码/手机号需验证当前密码
- 支持 MFA 多因素认证
- 会话管理支持单设备/多设备控制

## License

MIT
