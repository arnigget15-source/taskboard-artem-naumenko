(() => {
  const { api, showMessage } = window.TaskBoard;
  const message = document.getElementById('authMessage');
  api('/auth/me').then(() => { location.href = 'boards.html'; }).catch(() => {});

  document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    try {
      await api('/auth/login', 'POST', {
        login: document.getElementById('login').value.trim(),
        password: document.getElementById('password').value
      });
      location.href = 'boards.html';
    } catch (error) { showMessage(message, error.message); }
  });

  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const login = document.getElementById('regLogin');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const password = document.getElementById('regPassword');
    const repeat = document.getElementById('repeatPassword');
    login.classList.toggle('is-invalid', !/^[A-Za-z0-9._-]{3,30}$/.test(login.value.trim()));
    firstName.classList.toggle('is-invalid', !firstName.value.trim());
    lastName.classList.toggle('is-invalid', !lastName.value.trim());
    password.classList.toggle('is-invalid', password.value.length < 8 || password.value.length > 72);
    repeat.classList.toggle('is-invalid', repeat.value !== password.value || !repeat.value);
    if (registerForm.querySelector('.is-invalid')) return;
    try {
      await api('/auth/register', 'POST', {
        login: login.value.trim(), firstName: firstName.value.trim(),
        lastName: lastName.value.trim(), password: password.value
      });
      location.href = 'boards.html';
    } catch (error) { showMessage(message, error.message); }
  });
})();
