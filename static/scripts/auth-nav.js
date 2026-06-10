/**
 * auth-nav.js
 * Klik profil -> dashboard.html
 */

(async function initAuthNav() {
  const authItem = document.getElementById('navAuthItem');
  if (!authItem) return;

  try {
    const res = await fetch('/api/auth/me');
    const data = await res.json();

    if (data.logged_in) {
      authItem.innerHTML = `
        <div class="nav-user-wrapper">

          <a href="dashboard.html" class="nav-user-card">
            <div class="nav-user-left">

              <div class="nav-user-avatar">
                ${data.user.username.charAt(0).toUpperCase()}
              </div>

              <span class="nav-user-name">
                ${data.user.username}
              </span>

            </div>
          </a>

          <button class="btn-nav-logout" onclick="logoutUser()">
            Keluar
          </button>

        </div>
      `;
    } else {
      authItem.innerHTML = `
        <a href="login.html" class="btn-nav-login">
          Masuk
        </a>
      `;
    }
  } catch (e) {
    authItem.innerHTML = `
      <a href="login.html" class="btn-nav-login">
        Masuk
      </a>
    `;
  }
})();

async function logoutUser() {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST'
    });
  } catch (e) {}

  window.location.href = 'index.html';
}