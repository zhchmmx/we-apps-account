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
 *
 * Note: JWT auth is short-lived (15 min) and is not a session - a page
 * reload after expiry requires a fresh link from the client app.
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
    return user;
  } catch (e) {
    return null;
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (!initAppwrite()) {
    console.warn('Appwrite not initialized - check config.js');
  }
});
