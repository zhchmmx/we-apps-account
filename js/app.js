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
  return password.length >= 8;
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

function updatePasswordStrength(password) {
  const bars = document.querySelectorAll('.strength-bar');
  const text = document.querySelector('.strength-text');
  if (!bars.length) return;
  
  const score = checkPasswordStrength(password);
  const levels = ['', 'weak', 'medium', 'medium', 'strong', 'strong'];
  const labels = ['', '弱', '中等', '中等', '强', '非常强'];
  
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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (!initAppwrite()) {
    console.warn('Appwrite not initialized - check config.js');
  }
});
