// BitBeetle — Mock auth helpers
// Demo credentials: admin@bitbeetle.com / password

const DEMO_USER = {
  email: 'admin@bitbeetle.com',
  password: 'password',
  name: 'Rohan Garg',
  initials: 'RG',
  role: 'Support Lead'
};

const SESSION_KEY = 'bb_session';

function bbLogin(email, password) {
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    const session = { name: DEMO_USER.name, email, initials: DEMO_USER.initials, role: DEMO_USER.role };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

function bbGuard() {
  if (!localStorage.getItem(SESSION_KEY)) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

function bbLogout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = '/login.html';
}

function bbGetSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (_) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}
