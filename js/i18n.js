/**
 * We Apps Account - Internationalization
 * Supports Chinese (zh) and English (en), extensible for more languages
 */

const translations = {
  zh: {
    // === Common ===
    'common.appName': 'We Apps Account',
    'common.cancel': '取消',
    'common.confirm': '确认',
    'common.save': '保存',
    'common.update': '更新',
    'common.loading': '加载中...',
    'common.backToLogin': '返回登录',

    // === Dashboard Nav ===
    'nav.account': '账户',
    'nav.advanced': '高级',
    'nav.profile': '个人信息',
    'nav.security': '安全设置',
    'nav.sessions': '活跃会话',
    'nav.identities': '关联身份',
    'nav.danger': '危险操作',
    'nav.logout': '退出登录',

    // === Dashboard Header ===
    'dash.loading': '加载中...',
    'dash.title.profile': '个人信息',
    'dash.title.security': '安全设置',
    'dash.title.sessions': '活跃会话',
    'dash.title.identities': '关联身份',
    'dash.title.danger': '危险操作',
    'dash.title.default': '账户管理',

    // === Verification Banner ===
    'dash.verifyBanner': '您的邮箱尚未验证，部分功能可能受限。',
    'dash.verifyNow': '立即验证',

    // === Profile Tab ===
    'dash.basicInfo': '基本信息',
    'dash.unverified': '未验证',
    'dash.verified': '已验证',
    'dash.userId': '用户 ID',
    'dash.name': '姓名',
    'dash.email': '电子邮件',
    'dash.created': '注册时间',
    'dash.notSet': '未设置',
    'dash.changeName': '修改姓名',
    'dash.namePlaceholder': '输入新姓名',
    'dash.changeEmail': '修改邮箱',
    'dash.emailPlaceholder': '新邮箱地址',
    'dash.currentPassword': '当前密码',

    // === Security Tab ===
    'dash.changePassword': '修改密码',
    'dash.currentPasswordLabel': '当前密码',
    'dash.currentPasswordPlaceholder': '输入当前密码',
    'dash.newPassword': '新密码',
    'dash.newPasswordPlaceholder': '输入新密码（至少 8 位）',
    'dash.updatePassword': '更新密码',
    'dash.emailVerify': '邮箱验证',
    'dash.emailVerifyDesc': '验证您的邮箱地址以确保账户安全。',
    'dash.sendVerifyEmail': '发送验证邮件',

    // === Sessions Tab ===
    'dash.activeSessions': '活跃会话',
    'dash.loadingSessions': '加载会话中...',
    'dash.noSessions': '暂无活跃会话',
    'dash.current': '(当前)',
    'dash.unknownDevice': '未知设备',
    'dash.delete': '删除',
    'dash.loadFailed': '加载失败',

    // === Identities Tab ===
    'dash.linkedIdentities': '关联身份',
    'dash.linkedIdentitiesDesc': '管理通过第三方服务关联的身份。',
    'dash.loadingIdentities': '加载关联身份中...',
    'dash.noIdentities': '暂无关联身份',
    'dash.unknown': '未知',

    // === Danger Zone ===
    'dash.dangerZone': '危险操作',
    'dash.dangerDesc': '以下操作不可撤销，请谨慎操作。',
    'dash.disableAccount': '禁用账户',
    'dash.disableDesc': '禁用后您将无法登录，但数据不会删除。',
    'dash.deleteAccount': '删除账户',
    'dash.deleteDesc': '永久删除您的账户和所有相关数据。',

    // === Modals ===
    'dash.confirmAction': '确认操作',
    'dash.confirmMessage': '您确定要执行此操作吗？',
    'dash.confirmDisable': '禁用账户',
    'dash.confirmDisableMsg': '禁用后您将无法登录。此操作需要重新联系客服才能恢复。确定继续吗？',
    'dash.confirmDelete': '删除账户',
    'dash.confirmDeleteMsg': '此操作将永久删除您的账户和所有数据，且不可恢复。确定继续吗？',

    // === Toast Messages ===
    'msg.nameUpdated': '姓名已更新',
    'msg.updateFailed': '更新失败',
    'msg.invalidEmail': '请输入有效邮箱',
    'msg.enterPassword': '请输入当前密码',
    'msg.emailUpdated': '邮箱已更新，请重新登录',
    'msg.fillAllFields': '请填写所有字段',
    'msg.passwordMin8': '密码不符合要求',
    'msg.passwordUpdated': '密码已更新',
    'msg.sessionDeleted': '会话已删除',
    'msg.deleteFailed': '删除失败',
    'msg.verificationSent': '验证邮件已发送',
    'msg.sendFailed': '发送失败',
    'msg.accountDisabled': '账户已禁用',
    'msg.operationFailed': '操作失败',
    'msg.contactAdmin': '请联系管理员删除账户',
    'msg.cannotDelete': '客户端无法直接删除账户，请联系管理员',
    'msg.loggedOut': '已退出登录',

    // === Password Strength ===
    'strength.1': '非常弱',
    'strength.2': '弱',
    'strength.3': '中等',
    'strength.4': '强',
    'strength.5': '非常强',

    // === Password Requirements ===
    'pwReq.title': '密码要求',
    'pwReq.length': '8 到 256 个字符',
    'pwReq.uppercase': '至少一个大写字母',
    'pwReq.lowercase': '至少一个小写字母',
    'pwReq.symbol': '至少一个符号（如 !@#$%）',

    // === Login Page ===
    'login.title': '登录 - We Apps Account',
    'login.heading': 'We Apps Account',
    'login.tagline': '一个 We Apps 账户，畅享所有 We Apps 服务',
    'login.welcome': '欢迎回来',
    'login.subtitle': '登录您的 We Apps 账户',
    'login.emailLabel': '电子邮件',
    'login.emailPlaceholder': 'name@example.com',
    'login.passwordLabel': '密码',
    'login.passwordPlaceholder': '输入密码',
    'login.forgot': '忘记密码？',
    'login.remember': '记住我',
    'login.loginBtn': '登录',
    'login.haveAccount': '已有账户？',
    'login.register': '立即注册',
    'login.invalidEmail': '请输入有效的电子邮件地址',
    'login.passwordMin8': '请输入密码',
    'login.loggingIn': '登录成功，正在跳转...',
    'login.invalidCredentials': '电子邮件或密码不正确',
    'login.sessionExists': '您已登录，正在跳转...',
    'login.rateLimit': '请求过于频繁，请稍后再试',
    'login.accountBlocked': '该账户已被禁用',
    'login.loginFailed': '登录失败，请重试',

    // === Register Page ===
    'register.title': '注册 - We Apps Account',
    'register.heading': '加入 We Apps',
    'register.tagline': '创建您的账户，开启无限可能',
    'register.createAccount': '创建账户',
    'register.subtitle': '注册 We Apps 账户',
    'register.nameLabel': '姓名',
    'register.namePlaceholder': '您的姓名（可选）',
    'register.emailLabel': '电子邮件',
    'register.emailPlaceholder': 'name@example.com',
    'register.passwordLabel': '密码',
    'register.passwordPlaceholder': '至少 8 个字符',
    'register.confirmPasswordLabel': '确认密码',
    'register.confirmPasswordPlaceholder': '再次输入密码',
    'register.passwordMismatch': '两次输入的密码不一致',
    'register.termsText': '我已阅读并同意',
    'register.termsLink': '服务条款',
    'register.and': '和',
    'register.privacyLink': '隐私政策',
    'register.registerBtn': '创建账户',
    'register.hasAccount': '已有账户？',
    'register.login': '立即登录',
    'register.invalidEmail': '请输入有效的电子邮件地址',
    'register.passwordMin8': '密码不符合要求，请查看下方提示',
    'register.acceptTerms': '请同意服务条款和隐私政策',
    'register.emailExists': '该电子邮件已被注册',
    'register.rateLimit': '请求过于频繁，请稍后再试',
    'register.passwordWeak': '密码不符合安全要求',
    'register.registerFailed': '注册失败，请重试',
    'register.success': '注册成功！',

    // === Forgot Password Page ===
    'forgot.title': '找回密码 - We Apps Account',
    'forgot.heading': '重置密码',
    'forgot.tagline': '别担心，我们会帮您找回账户访问权限',
    'forgot.recoverPassword': '找回密码',
    'forgot.subtitle': '输入您的注册邮箱，我们将发送重置链接',
    'forgot.emailLabel': '电子邮件',
    'forgot.emailPlaceholder': 'name@example.com',
    'forgot.sendLink': '发送重置链接',
    'forgot.successMsg': '重置链接已发送到您的邮箱，请查收邮件后在此设置新密码。',
    'forgot.newPasswordLabel': '新密码',
    'forgot.newPasswordPlaceholder': '至少 8 个字符',
    'forgot.confirmPasswordLabel': '确认新密码',
    'forgot.confirmPasswordPlaceholder': '再次输入新密码',
    'forgot.resetBtn': '设置新密码',
    'forgot.backToLogin': '返回登录',
    'forgot.invalidEmail': '请输入有效的电子邮件地址',
    'forgot.passwordMin8': '密码不符合要求，请查看下方提示',
    'forgot.passwordMismatch': '两次输入的密码不一致',
    'forgot.linkSent': '重置链接已发送到您的邮箱，请查收邮件',
    'forgot.checkEmail': '请检查您的邮箱',
    'forgot.emailNotFound': '该邮箱未注册账户',
    'forgot.rateLimit': '请求过于频繁，请稍后再试',
    'forgot.sendFailed': '发送失败，请重试',
    'forgot.linkExpired': '重置链接已过期或无效，请重新申请',
    'forgot.resetFailed': '重置失败，请重试',
    'forgot.resetSuccess': '密码重置成功！',

    // === Verify Email Page ===
    'verify.title': '邮箱验证 - We Apps Account',
    'verify.heading': '验证邮箱',
    'verify.tagline': '确认您的邮箱地址以完成账户设置',
    'verify.verifyEmail': '邮箱验证',
    'verify.subtitle': '请输入您收到的验证码',
    'verify.userIdLabel': '用户 ID',
    'verify.userIdPlaceholder': '从邮件链接中获取',
    'verify.secretLabel': '验证码',
    'verify.secretPlaceholder': '输入验证码',
    'verify.verifyBtn': '验证邮箱',
    'verify.or': '或者',
    'verify.resend': '重新发送验证邮件',
    'verify.verifying': '正在验证您的邮箱，请稍候...',
    'verify.success': '邮箱验证成功！正在跳转...',
    'verify.invalidCode': '验证码无效或已过期',
    'verify.rateLimit': '请求过于频繁，请稍后再试',
    'verify.verifyFailed': '验证失败，请重试',
    'verify.fillFields': '请填写用户 ID 和验证码',
    'verify.verifySuccess': '邮箱验证成功！',
    'verify.pleaseLogin': '请先登录',
    'verify.resent': '验证邮件已重新发送',
    'verify.sendFailed': '发送失败',

    // === Language Switcher ===
    'lang.switcher': '切换语言'
  },

  en: {
    // === Common ===
    'common.appName': 'We Apps Account',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.update': 'Update',
    'common.loading': 'Loading...',
    'common.backToLogin': 'Back to Login',

    // === Dashboard Nav ===
    'nav.account': 'Account',
    'nav.advanced': 'Advanced',
    'nav.profile': 'Profile',
    'nav.security': 'Security',
    'nav.sessions': 'Active Sessions',
    'nav.identities': 'Linked Identities',
    'nav.danger': 'Danger Zone',
    'nav.logout': 'Log Out',

    // === Dashboard Header ===
    'dash.loading': 'Loading...',
    'dash.title.profile': 'Profile',
    'dash.title.security': 'Security Settings',
    'dash.title.sessions': 'Active Sessions',
    'dash.title.identities': 'Linked Identities',
    'dash.title.danger': 'Danger Zone',
    'dash.title.default': 'Account Management',

    // === Verification Banner ===
    'dash.verifyBanner': 'Your email is not verified. Some features may be limited.',
    'dash.verifyNow': 'Verify Now',

    // === Profile Tab ===
    'dash.basicInfo': 'Basic Information',
    'dash.unverified': 'Unverified',
    'dash.verified': 'Verified',
    'dash.userId': 'User ID',
    'dash.name': 'Name',
    'dash.email': 'Email',
    'dash.created': 'Registration Time',
    'dash.notSet': 'Not set',
    'dash.changeName': 'Change Name',
    'dash.namePlaceholder': 'Enter new name',
    'dash.changeEmail': 'Change Email',
    'dash.emailPlaceholder': 'New email address',
    'dash.currentPassword': 'Current Password',

    // === Security Tab ===
    'dash.changePassword': 'Change Password',
    'dash.currentPasswordLabel': 'Current Password',
    'dash.currentPasswordPlaceholder': 'Enter current password',
    'dash.newPassword': 'New Password',
    'dash.newPasswordPlaceholder': 'Enter new password (at least 8 characters)',
    'dash.updatePassword': 'Update Password',
    'dash.emailVerify': 'Email Verification',
    'dash.emailVerifyDesc': 'Verify your email address to ensure account security.',
    'dash.sendVerifyEmail': 'Send Verification Email',

    // === Sessions Tab ===
    'dash.activeSessions': 'Active Sessions',
    'dash.loadingSessions': 'Loading sessions...',
    'dash.noSessions': 'No active sessions',
    'dash.current': '(Current)',
    'dash.unknownDevice': 'Unknown Device',
    'dash.delete': 'Delete',
    'dash.loadFailed': 'Failed to load',

    // === Identities Tab ===
    'dash.linkedIdentities': 'Linked Identities',
    'dash.linkedIdentitiesDesc': 'Manage identities linked through third-party services.',
    'dash.loadingIdentities': 'Loading linked identities...',
    'dash.noIdentities': 'No linked identities',
    'dash.unknown': 'Unknown',

    // === Danger Zone ===
    'dash.dangerZone': 'Danger Zone',
    'dash.dangerDesc': 'The following actions are irreversible. Proceed with caution.',
    'dash.disableAccount': 'Disable Account',
    'dash.disableDesc': 'You will not be able to log in after disabling, but data will not be deleted.',
    'dash.deleteAccount': 'Delete Account',
    'dash.deleteDesc': 'Permanently delete your account and all associated data.',

    // === Modals ===
    'dash.confirmAction': 'Confirm Action',
    'dash.confirmMessage': 'Are you sure you want to perform this action?',
    'dash.confirmDisable': 'Disable Account',
    'dash.confirmDisableMsg': 'You will not be able to log in after disabling. This action requires contacting support to restore. Continue?',
    'dash.confirmDelete': 'Delete Account',
    'dash.confirmDeleteMsg': 'This will permanently delete your account and all data. This action cannot be undone. Continue?',

    // === Toast Messages ===
    'msg.nameUpdated': 'Name updated',
    'msg.updateFailed': 'Update failed',
    'msg.invalidEmail': 'Please enter a valid email',
    'msg.enterPassword': 'Please enter current password',
    'msg.emailUpdated': 'Email updated, please log in again',
    'msg.fillAllFields': 'Please fill in all fields',
    'msg.passwordMin8': 'Password does not meet requirements',
    'msg.passwordUpdated': 'Password updated',
    'msg.sessionDeleted': 'Session deleted',
    'msg.deleteFailed': 'Delete failed',
    'msg.verificationSent': 'Verification email sent',
    'msg.sendFailed': 'Failed to send',
    'msg.accountDisabled': 'Account disabled',
    'msg.operationFailed': 'Operation failed',
    'msg.contactAdmin': 'Please contact admin to delete account',
    'msg.cannotDelete': 'Cannot delete account from client, please contact admin',
    'msg.loggedOut': 'Logged out',

    // === Password Strength ===
    'strength.1': 'Very Weak',
    'strength.2': 'Weak',
    'strength.3': 'Fair',
    'strength.4': 'Strong',
    'strength.5': 'Very Strong',

    // === Password Requirements ===
    'pwReq.title': 'Password requirements',
    'pwReq.length': '8 to 256 characters',
    'pwReq.uppercase': 'At least one uppercase letter',
    'pwReq.lowercase': 'At least one lowercase letter',
    'pwReq.symbol': 'At least one symbol (e.g. !@#$%)',

    // === Login Page ===
    'login.title': 'Login - We Apps Account',
    'login.heading': 'We Apps Account',
    'login.tagline': 'One We Apps account for all We Apps services',
    'login.welcome': 'Welcome Back',
    'login.subtitle': 'Log in to your We Apps account',
    'login.emailLabel': 'Email',
    'login.emailPlaceholder': 'name@example.com',
    'login.passwordLabel': 'Password',
    'login.passwordPlaceholder': 'Enter password',
    'login.forgot': 'Forgot password?',
    'login.remember': 'Remember me',
    'login.loginBtn': 'Log In',
    'login.haveAccount': 'Already have an account?',
    'login.register': 'Register now',
    'login.invalidEmail': 'Please enter a valid email address',
    'login.passwordMin8': 'Please enter your password',
    'login.loggingIn': 'Login successful, redirecting...',
    'login.invalidCredentials': 'Incorrect email or password',
    'login.sessionExists': 'You are already logged in, redirecting...',
    'login.rateLimit': 'Too many requests, please try again later',
    'login.accountBlocked': 'This account has been disabled',
    'login.loginFailed': 'Login failed, please try again',

    // === Register Page ===
    'register.title': 'Register - We Apps Account',
    'register.heading': 'Join We Apps',
    'register.tagline': 'Create your account and unlock endless possibilities',
    'register.createAccount': 'Create Account',
    'register.subtitle': 'Register a We Apps account',
    'register.nameLabel': 'Name',
    'register.namePlaceholder': 'Your name (optional)',
    'register.emailLabel': 'Email',
    'register.emailPlaceholder': 'name@example.com',
    'register.passwordLabel': 'Password',
    'register.passwordPlaceholder': 'At least 8 characters',
    'register.confirmPasswordLabel': 'Confirm Password',
    'register.confirmPasswordPlaceholder': 'Enter password again',
    'register.passwordMismatch': 'Passwords do not match',
    'register.termsText': 'I have read and agree to the',
    'register.termsLink': 'Terms of Service',
    'register.and': 'and',
    'register.privacyLink': 'Privacy Policy',
    'register.registerBtn': 'Create Account',
    'register.hasAccount': 'Already have an account?',
    'register.login': 'Log in now',
    'register.invalidEmail': 'Please enter a valid email address',
    'register.passwordMin8': 'Password does not meet requirements, see hints below',
    'register.acceptTerms': 'Please accept the Terms of Service and Privacy Policy',
    'register.emailExists': 'This email is already registered',
    'register.rateLimit': 'Too many requests, please try again later',
    'register.passwordWeak': 'Password does not meet security requirements',
    'register.registerFailed': 'Registration failed, please try again',
    'register.success': 'Registration successful!',

    // === Forgot Password Page ===
    'forgot.title': 'Recover Password - We Apps Account',
    'forgot.heading': 'Reset Password',
    'forgot.tagline': "Don't worry, we'll help you regain access to your account",
    'forgot.recoverPassword': 'Recover Password',
    'forgot.subtitle': 'Enter your registered email and we will send you a reset link',
    'forgot.emailLabel': 'Email',
    'forgot.emailPlaceholder': 'name@example.com',
    'forgot.sendLink': 'Send Reset Link',
    'forgot.successMsg': 'A reset link has been sent to your email. Please check your email and set a new password here.',
    'forgot.newPasswordLabel': 'New Password',
    'forgot.newPasswordPlaceholder': 'At least 8 characters',
    'forgot.confirmPasswordLabel': 'Confirm New Password',
    'forgot.confirmPasswordPlaceholder': 'Enter new password again',
    'forgot.resetBtn': 'Set New Password',
    'forgot.backToLogin': 'Back to Login',
    'forgot.invalidEmail': 'Please enter a valid email address',
    'forgot.passwordMin8': 'Password does not meet requirements, see hints below',
    'forgot.passwordMismatch': 'Passwords do not match',
    'forgot.linkSent': 'A reset link has been sent to your email, please check',
    'forgot.checkEmail': 'Please check your email',
    'forgot.emailNotFound': 'No account found with this email',
    'forgot.rateLimit': 'Too many requests, please try again later',
    'forgot.sendFailed': 'Failed to send, please try again',
    'forgot.linkExpired': 'Reset link has expired or is invalid, please request again',
    'forgot.resetFailed': 'Reset failed, please try again',
    'forgot.resetSuccess': 'Password reset successful!',

    // === Verify Email Page ===
    'verify.title': 'Email Verification - We Apps Account',
    'verify.heading': 'Verify Email',
    'verify.tagline': 'Confirm your email address to complete account setup',
    'verify.verifyEmail': 'Email Verification',
    'verify.subtitle': 'Enter the verification code you received',
    'verify.userIdLabel': 'User ID',
    'verify.userIdPlaceholder': 'Get from email link',
    'verify.secretLabel': 'Verification Code',
    'verify.secretPlaceholder': 'Enter verification code',
    'verify.verifyBtn': 'Verify Email',
    'verify.or': 'Or',
    'verify.resend': 'Resend Verification Email',
    'verify.verifying': 'Verifying your email, please wait...',
    'verify.success': 'Email verified successfully! Redirecting...',
    'verify.invalidCode': 'Verification code is invalid or expired',
    'verify.rateLimit': 'Too many requests, please try again later',
    'verify.verifyFailed': 'Verification failed, please try again',
    'verify.fillFields': 'Please fill in User ID and verification code',
    'verify.verifySuccess': 'Email verified successfully!',
    'verify.pleaseLogin': 'Please log in first',
    'verify.resent': 'Verification email resent',
    'verify.sendFailed': 'Failed to send',

    // === Language Switcher ===
    'lang.switcher': 'Switch Language'
  }
};

// Supported languages metadata
const supportedLanguages = {
  zh: { label: '中文', direction: 'ltr' },
  en: { label: 'English', direction: 'ltr' }
};

// ===== Core Functions =====

function t(key) {
  const lang = getCurrentLanguage();
  return (translations[lang] && translations[lang][key]) || translations.zh[key] || key;
}

function getCurrentLanguage() {
  return localStorage.getItem('app-language') || detectBrowserLanguage();
}

// Map app language code to Appwrite-supported locale for email templates
function getAppwriteLocale() {
  const map = { zh: 'zh-cn', en: 'en' };
  return map[getCurrentLanguage()] || 'en';
}

function detectBrowserLanguage() {
  const browserLang = (navigator.language || navigator.userLanguage || 'zh').toLowerCase();
  const shortLang = browserLang.split('-')[0];
  return supportedLanguages[shortLang] ? shortLang : 'zh';
}

function setLanguage(lang) {
  if (!supportedLanguages[lang]) return;
  localStorage.setItem('app-language', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  updateLanguageSwitcher();
  // Update password strength labels if on a page with password field
  const pwdInput = document.getElementById('password') || document.getElementById('new-password') || document.getElementById('sec-new-password');
  if (pwdInput) updatePasswordStrength(pwdInput.value);
}

function applyTranslations() {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
  // Title attributes
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });
  // Page <title>
  const titleEl = document.querySelector('[data-i18n-page-title]');
  if (titleEl) document.title = t(titleEl.getAttribute('data-i18n-page-title'));
}

// ===== Language Switcher =====

function renderLanguageSwitcher() {
  const currentLang = getCurrentLanguage();
  const options = Object.entries(supportedLanguages)
    .map(([code, meta]) =>
      `<button class="lang-option ${currentLang === code ? 'active' : ''}" onclick="setLanguage('${code}')">${meta.label}</button>`
    ).join('');
  return `<div class="lang-switcher"><button class="lang-current" onclick="this.parentElement.classList.toggle('open')"><span class="lang-icon">🌐</span> ${supportedLanguages[currentLang].label} <span class="lang-arrow">▾</span></button><div class="lang-dropdown">${options}</div></div>`;
}

function updateLanguageSwitcher() {
  const currentLang = getCurrentLanguage();
  const switcher = document.querySelector('.lang-switcher');
  if (!switcher) return;
  const btn = switcher.querySelector('.lang-current');
  if (btn) btn.innerHTML = `<span class="lang-icon">🌐</span> ${supportedLanguages[currentLang].label} <span class="lang-arrow">▾</span>`;
  switcher.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.remove('active');
  });
  const activeOpt = switcher.querySelector(`.lang-option[onclick*="'${currentLang}'"]`);
  if (activeOpt) activeOpt.classList.add('active');
  switcher.classList.remove('open');
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  const lang = getCurrentLanguage();
  document.documentElement.lang = lang;
  applyTranslations();
});

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.lang-switcher')) {
    document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
  }
});
