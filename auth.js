// ===== ЭЛЕМЕНТЫ =====
const sphere = document.getElementById('sphere');
const mainScreen = document.getElementById('main-screen');
const authPanel = document.getElementById('auth-panel');

const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// ===== КЛИК ПО СФЕРЕ =====
sphere.addEventListener('click', () => {
  console.log('SPHERE CLICKED'); // 🔴 важно для проверки

  mainScreen.classList.add('hidden');
  authPanel.classList.add('show');
});

// ===== ТАБЫ =====
loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');

  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
});

registerTab.addEventListener('click', () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');

  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
});



