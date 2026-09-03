/**
 * We Apps Account - Main Application Logic
 * Handles authentication flows with Appwrite
 */

// Initialize Appwrite
let client, account;

function initAppwrite() {
  if (typeof Appwrite === 'undefined') {
    console.error('Appwrite SDK not loaded');
    return false;
  }
  
  client = new Appwrite.Client();
  account = new Appwrite.Account(client);
  
  client
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId);
  
  return true;
}

// Utility functions
function showAlert(elementId, message, type = 'error') {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.className = `alert alert-${type} visible`;
  el.textContent = message;
}

function hideAlert(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.className = 'alert';
  el.textContent = '';
}

function setLoading(buttonId, loading) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  if (loading) {
    btn.classList.add('loading');
    btn.disabled = true;
  } else {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

function showToast(message, type = 'info') {
  const container = document.querySelector('.toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  
  setTimeout(() => toast.remove(), 3000);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password.length >= 8 && password.length <= 256
    && /[A-Z]/.test(password)
    && /[a-z]/.test(password)
    && /[0-9]/.test(password)
    && /[^A-Za-z0-9]/.test(password);
}

// Password strength checker
function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function updatePasswordStrength(password, container) {
  const root = container || document;
  const bars = root.querySelectorAll('.strength-bar');
  const text = root.querySelector('.strength-text');
  if (!bars.length) return;
  
  const score = checkPasswordStrength(password);
  const levels = ['', 'weak', 'medium', 'medium', 'strong', 'strong'];
  const labels = ['', t('strength.1'), t('strength.2'), t('strength.3'), t('strength.4'), t('strength.5')];
  
  bars.forEach((bar, i) => {
    bar.className = 'strength-bar';
    if (password.length > 0 && i < score) {
      bar.classList.add(levels[score]);
    }
  });
  
  if (text) {
    text.textContent = password.length > 0 ? labels[score] : '';
  }
}

// Password requirements indicator
function updatePasswordRequirements(password, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const checks = [
    { key: 'pwReq.length',    ok: password.length >= 8 && password.length <= 256 },
    { key: 'pwReq.uppercase', ok: /[A-Z]/.test(password) },
    { key: 'pwReq.lowercase', ok: /[a-z]/.test(password) },
    { key: 'pwReq.symbol',    ok: /[^A-Za-z0-9]/.test(password) },
    { key: 'pwReq.digit',     ok: /[0-9]/.test(password) },
  ];

  const items = container.querySelectorAll('.pw-req-item');
  checks.forEach((check, i) => {
    if (items[i]) {
      items[i].classList.toggle('met', check.ok);
      items[i].classList.toggle('unmet', !check.ok && password.length > 0);
    }
  });
}

// Toggle password visibility
function togglePassword(inputId, toggleBtn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  if (toggleBtn) {
    toggleBtn.textContent = input.type === 'password' ? '👁' : '🙈';
  }
}

// Navigation helpers
function navigateTo(page) {
  window.location.href = page;
}

// Check if user is already logged in
async function checkAuth() {
  if (!account && !initAppwrite()) return null;
  try {
    return await account.get();
  } catch (e) {
    return null;
  }
}

// Decode JWT payload (no signature verification, read-only)
function parseJwtPayload(jwt) {
  try {
    const part = jwt.split('.')[1];
    const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(base64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

/**
 * Auto-login via ?jwt= URL parameter (handoff from the desktop client app).
 *
 * Flow:
 * 1. Read jwt from the query string and immediately strip it from the
 *    address bar so it never lingers in history / referrer.
 * 2. client.setJWT(jwt) and verify with account.get().
 * 3. If an existing browser session shadows the JWT identity (different
 *    userId), delete that session and verify again.
 * 4. On success, persist the JWT in sessionStorage (tab-scoped) so it
 *    survives same-tab page navigation until it expires (15 min).
 *
 * Note: JWT auth is short-lived (15 min) and is not a session - after
 * expiry the user must reopen the link from the client app.
 *
 * @returns {Promise<object|null>} the logged-in user object, or null
 */
async function loginWithUrlJwt() {
  const params = new URLSearchParams(window.location.search);
  const jwt = params.get('jwt');
  if (!jwt) return null;

  // Strip credentials from the URL immediately
  params.delete('jwt');
  const rest = params.toString();
  window.history.replaceState(null, '', window.location.pathname + (rest ? '?' + rest : ''));

  if (!account && !initAppwrite()) return null;

  try {
    client.setJWT(jwt);
    let user = await account.get();

    const expectedUserId = (parseJwtPayload(jwt) || {}).userId;
    if (expectedUserId && user.$id !== expectedUserId) {
      // An existing browser session shadowed the JWT identity - drop it
      try { await account.deleteSession('current'); } catch (e) { /* ignore */ }
      user = await account.get();
    }

    // JWT mode flag: 'current' session belongs to the client app.
    // Pages must NOT delete it on behalf of the browser (logout etc.).
    window.__weappsJwtAuth = true;
    // Persist for same-tab navigation (dashboard, refresh, etc.)
    try { sessionStorage.setItem(JWT_STORAGE_KEY, jwt); } catch (e) { /* ignore */ }
    return user;
  } catch (e) {
    return null;
  }
}

// Storage key for the JWT persisted across same-tab page loads
const JWT_STORAGE_KEY = 'weapps_handoff_jwt';

/**
 * Restore JWT auth persisted by loginWithUrlJwt() on an earlier page.
 * Verifies local expiry first, then validates against the API.
 * If an existing browser session belongs to a DIFFERENT user, the explicit
 * session wins: the stale JWT is discarded.
 *
 * @returns {Promise<object|null>} the logged-in user object, or null
 */
async function restoreJwtAuth() {
  let jwt = null;
  try { jwt = sessionStorage.getItem(JWT_STORAGE_KEY); } catch (e) { return null; }
  if (!jwt) return null;

  const payload = parseJwtPayload(jwt);
  if (payload && payload.exp && payload.exp * 1000 <= Date.now()) {
    clearJwtAuth();
    return null;
  }

  if (!account && !initAppwrite()) return null;
  try {
    client.setJWT(jwt);
    const user = await account.get();
    if (payload && payload.userId && user.$id !== payload.userId) {
      // An explicit browser session for another user takes precedence
      clearJwtAuth();
      return null;
    }
    window.__weappsJwtAuth = true;
    return user;
  } catch (e) {
    clearJwtAuth();
    return null;
  }
}

// Drop the persisted JWT (logout, expiry, or explicit session login)
function clearJwtAuth() {
  try { sessionStorage.removeItem(JWT_STORAGE_KEY); } catch (e) { /* ignore */ }
  window.__weappsJwtAuth = false;
}

// ===== OAuth (Microsoft) =====

/**
 * 发起 OAuth2 登录：跳转到 Appwrite 的 OAuth 端点，再由其转发到微软授权页。
 * Appwrite Web SDK v16.1.0 使用位置参数签名：
 *   createOAuth2Token(provider, success, failure, scopes)
 *
 * 使用 createOAuth2Token（而非 createOAuth2Session）以规避跨站 cookie 问题：
 * - createOAuth2Session 依赖 Appwrite 在自己的域名上种 session cookie，
 *   页面与 API 跨站时会被浏览器当作第三方 cookie 拦截（Brave/Safari/无痕等），
 *   导致回跳后 account.get() 拿不到会话，表现为主观上的"登录失败或已取消"。
 * - createOAuth2Token 流程中，Appwrite 会把 userId + secret 拼到 success URL，
 *   由回调页调用 createSession(userId, secret) 在当前页面上下文中显式建立会话，
 *   不依赖跨站 cookie，全浏览器可用。
 *
 * @param {string} provider  provider 标识，如 'microsoft'
 * @param {string} [alertId] 即时出错时用于展示错误提示的 alert 元素 id
 */
async function oauthLogin(provider, alertId) {
  if (!account && !initAppwrite()) return;
  try {
    const base = window.location.origin;
    await account.createOAuth2Token(
      provider,
      `${base}/oauth-callback.html`,         // success
      `${base}/oauth-callback.html?error=1`  // failure
    );
    // 成功后 SDK 会触发整页跳转，此函数不会继续执行
  } catch (err) {
    // 例如 provider 未在 Appwrite Console 启用时抛错
    console.error('[OAuth] oauthLogin 发起失败:', { type: err.type, code: err.code, message: err.message });
    if (alertId) showAlert(alertId, t('oauth.failed'), 'error');
  }
}

/**
 * OAuth 回调页处理：用 OAuth 令牌建立会话并跳转仪表盘。
 * 由 oauth-callback.html 在页面加载时调用；返回 false 表示需要展示失败提示。
 *
 * 流程：
 * 1. 失败路径（?error=1）直接返回 false。
 * 2. 成功路径：Appwrite 在 success URL 上追加 userId + secret，
 *    调用 createSession(userId, secret) 显式建立会话（不依赖跨站 cookie）。
 * 3. 兜底：若已有有效 cookie 会话（如邮箱登录残留），直接 account.get() 通过。
 *
 * @returns {Promise<boolean>} 是否成功建立会话
 */
async function handleOAuthCallback() {
  console.log('[OAuth] 回调页进入, 完整 URL:', window.location.href);

  if (!account && !initAppwrite()) {
    console.error('[OAuth] Appwrite 初始化失败');
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  const paramsObj = {};
  params.forEach((v, k) => paramsObj[k] = v);
  console.log('[OAuth] 查询参数:', paramsObj);

  if (params.has('error')) {
    console.error('[OAuth] 收到失败标记: error =', params.get('error'));
    return false;
  }

  const userId = params.get('userId');
  const secret = params.get('secret');
  console.log('[OAuth] userId 存在:', !!userId, '| secret 存在:', !!secret);

  if (userId && secret) {
    try {
      console.log('[OAuth] 调用 createSession(userId, secret)...');
      await account.createSession(userId, secret);
      console.log('[OAuth] createSession 成功');
      clearJwtAuth(); // 显式 OAuth 会话优先于客户端 JWT 交接
      navigateTo('dashboard.html');
      return true;
    } catch (e) {
      console.error('[OAuth] createSession 失败:', { type: e.type, code: e.code, message: e.message, stack: e.stack });
      return false;
    }
  }

  // 兜底：已有 cookie 会话直接通过
  try {
    console.log('[OAuth] 无 userId/secret，尝试 account.get() 兜底...');
    const user = await account.get();
    console.log('[OAuth] 兜底 account.get() 成功:', user && user.$id);
    if (user) {
      clearJwtAuth();
      navigateTo('dashboard.html');
      return true;
    }
  } catch (e) {
    console.error('[OAuth] 兜底 account.get() 失败:', { type: e.type, code: e.code, message: e.message, stack: e.stack });
  }
  return false;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (!initAppwrite()) {
    console.warn('Appwrite not initialized - check config.js');
  }
});
