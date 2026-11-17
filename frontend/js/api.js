(() => {
  async function api(path, method = 'GET', body) {
    const options = { method, credentials: 'same-origin', headers: {} };
    if (body !== undefined) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }
    const response = await fetch('/api' + path, options);
    if (response.status === 401) {
      if (!location.pathname.endsWith('login.html') && location.pathname !== '/') location.href = 'login.html';
      const error = new Error('Zaloguj się, aby kontynuować.');
      error.status = 401;
      throw error;
    }
    const data = response.status === 204 ? null : await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error || 'Wystąpił błąd.');
      error.status = response.status;
      throw error;
    }
    return data;
  }

  function showMessage(element, message, type = 'danger') {
    element.replaceChildren();
    const alert = document.createElement('div');
    alert.className = 'alert alert-' + type + ' alert-dismissible fade show';
    alert.setAttribute('role', 'alert');
    alert.append(document.createTextNode(message));
    const close = document.createElement('button');
    close.type = 'button'; close.className = 'btn-close'; close.setAttribute('data-bs-dismiss', 'alert'); close.setAttribute('aria-label', 'Zamknij');
    alert.append(close); element.append(alert);
  }

  async function setupHeader() {
    const user = await api('/auth/me');
    const name = document.getElementById('userName');
    if (name) name.textContent = user.firstName + ' ' + user.lastName;
    const logout = document.getElementById('logoutBtn');
    if (logout) logout.addEventListener('click', async () => {
      try { await api('/auth/logout', 'POST'); location.href = 'login.html'; }
      catch (error) { showMessage(document.getElementById('pageMessage'), error.message); }
    });
    return user;
  }

  window.TaskBoard = { api, showMessage, setupHeader };
})();
