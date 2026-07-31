async function loadContent() {
  const [contentRes, assetsRes, mapsRes] = await Promise.all([
    fetch('/api/content'),
    fetch('/api/content/assets'),
    fetch('/api/content/maps'),
  ]);

  const content = await contentRes.json();
  const assets = await assetsRes.json();
  const maps = await mapsRes.json();

  document.getElementById('stats').innerHTML = `
    <div class="stat-card">
      <span>Database</span>
      <strong>${content.assetDatabase}</strong>
    </div>
    <div class="stat-card">
      <span>Assets</span>
      <strong>${assets.length}</strong>
    </div>
    <div class="stat-card">
      <span>Maps</span>
      <strong>${maps.length}</strong>
    </div>
    <div class="stat-card">
      <span>Initial Map</span>
      <strong>${content.initialMap}</strong>
    </div>
  `;

  document.getElementById('assetCount').textContent = `${assets.length}`;
  document.getElementById('mapCount').textContent = `${maps.length}`;

  const assetList = document.getElementById('assetList');
  assetList.innerHTML = assets.map((asset) => `
    <article class="card">
      <h3>${asset.key}</h3>
      <p>${asset.kind}</p>
      <p>${asset.path}</p>
      <span class="badge">${asset.options ? 'configured' : 'plain'}</span>
    </article>
  `).join('');

  const mapList = document.getElementById('mapList');
  mapList.innerHTML = maps.map((map) => `
    <article class="card">
      <h3>${map.assetKey}</h3>
      <p>${map.path}</p>
      <span class="badge">${map.logicFile || 'no logic'}</span>
    </article>
  `).join('');
}

async function refreshAuthState() {
  const meRes = await fetch('/api/auth/me');
  const me = await meRes.json();
  const authPanel = document.getElementById('authPanel');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const welcome = document.getElementById('welcome');

  if (me.authenticated) {
    authPanel.hidden = false;
    loginForm.hidden = true;
    signupForm.hidden = true;
    welcome.textContent = `Signed in as ${me.user.username} (${me.user.role})`;
  } else {
    authPanel.hidden = false;
    loginForm.hidden = false;
    signupForm.hidden = false;
    welcome.textContent = 'Please sign in to access the studio.';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadContent().catch((error) => {
    console.error(error);
    document.body.innerHTML = '<main class="shell"><h1>Unable to load content data</h1></main>';
  });

  refreshAuthState().catch((error) => {
    console.error(error);
  });

  document.getElementById('exportBtn').addEventListener('click', () => {
    window.open('/api/content/export?format=csv', '_blank');
  });

  document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      document.getElementById('authMessage').textContent = result.error || 'Login failed';
      return;
    }

    document.getElementById('authMessage').textContent = `Welcome, ${result.user.username}!`;
    event.currentTarget.reset();
    refreshAuthState();
  });

  document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      document.getElementById('authMessage').textContent = result.error || 'Signup failed';
      return;
    }

    document.getElementById('authMessage').textContent = `Account created for ${result.user.username}.`;
    event.currentTarget.reset();
    refreshAuthState();
  });

  document.getElementById('logoutBtn').addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    document.getElementById('authMessage').textContent = 'You have been logged out.';
    refreshAuthState();
  });
});
