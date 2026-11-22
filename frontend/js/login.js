(() => {
  const { api, showMessage } = window.TaskBoard;
  const message = document.getElementById('authMessage');
  api('/auth/me').then(() => { location.href = 'boards.html'; }).catch(() => {});

  function markInvalid(input, invalid) {
    input.classList.toggle('is-invalid', invalid);
    input.setAttribute('aria-invalid', String(invalid));
  }

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
    const email = document.getElementById('regEmail');
    const login = document.getElementById('regLogin');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const password = document.getElementById('regPassword');
    const repeat = document.getElementById('repeatPassword');

    markInvalid(email, !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value.trim()) || email.value.trim().length > 254);
    markInvalid(login, !/^[A-Za-z0-9._-]{3,30}$/.test(login.value.trim()));
    markInvalid(firstName, !firstName.value.trim() || firstName.value.trim().length > 50);
    markInvalid(lastName, !lastName.value.trim() || lastName.value.trim().length > 50);
    markInvalid(password, password.value.length < 8 || password.value.length > 72);
    markInvalid(repeat, repeat.value !== password.value || !repeat.value);

    const invalid = registerForm.querySelector('.is-invalid');
    if (invalid) { invalid.focus(); return; }

    try {
      await api('/auth/register', 'POST', {
        email: email.value.trim().toLowerCase(), login: login.value.trim(), firstName: firstName.value.trim(),
        lastName: lastName.value.trim(), password: password.value
      });
      location.href = 'boards.html';
    } catch (error) { showMessage(message, error.message); }
  });
})();