(() => {
  const { api, showMessage, setupHeader } = window.TaskBoard;
  const message = document.getElementById('pageMessage');
  const boardId = new URLSearchParams(location.search).get('id');
  const modal = new bootstrap.Modal(document.getElementById('taskModal'));
  const form = document.getElementById('taskForm');
  let users = [];
  let currentTask = null;
  let board = null;
  const labels = { low: 'Niski', medium: 'Średni', high: 'Wysoki' };
  const statuses = ['todo', 'in_progress', 'done'];
  const statusLabels = { todo: 'Do zrobienia', in_progress: 'W trakcie', done: 'Gotowe' };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function markInvalid(input, invalid) {
    input.classList.toggle('is-invalid', invalid);
    input.setAttribute('aria-invalid', String(invalid));
  }

  async function loadUsers() {
    users = await api('/users');
    const filter = document.getElementById('filterAssignee');
    const assignee = document.getElementById('taskAssignee');
    for (const user of users) {
      const label = user.firstName + ' ' + user.lastName;
      for (const select of [filter, assignee]) {
        const option = el('option', '', label); option.value = user.id; select.append(option);
      }
    }
  }

  function formatDate(value) {
    if (!value) return '';
    const date = new Date(value + 'T00:00:00');
    return date.toLocaleDateString('pl-PL');
  }

  function renderTask(task) {
    const card = el('article', 'card task-card priority-' + task.priority);
    const body = el('div', 'card-body');
    body.append(el('h3', 'task-title', task.title));
    const meta = el('div', 'task-details');
    meta.append(el('span', 'priority-badge', 'Priorytet: ' + labels[task.priority]));
    if (task.deadline) {
      const overdue = new Date(task.deadline + 'T23:59:59') < new Date() && task.status !== 'done';
      meta.append(el('span', overdue ? 'due-overdue' : '', 'Termin: ' + formatDate(task.deadline) + (overdue ? ' (po terminie)' : '')));
    }
    body.append(meta);
    const assignee = users.find(user => Number(user.id) === Number(task.assigneeId));
    body.append(el('p', 'task-details', 'Osoba: ' + (assignee ? assignee.firstName + ' ' + assignee.lastName : 'nieprzypisane')));
    const actions = el('div', 'task-actions');
    const move = el('button', 'btn btn-outline-primary', task.status === 'done' ? 'Otwórz ponownie' : 'Przenieś do: ' + statusLabels[statuses[statuses.indexOf(task.status) + 1]]);
    move.type = 'button'; move.addEventListener('click', () => changeStatus(task));
    const details = el('button', 'btn btn-outline-secondary', 'Szczegóły'); details.type = 'button'; details.addEventListener('click', () => openTask(task));
    const remove = el('button', 'btn btn-outline-danger', 'Usuń'); remove.type = 'button'; remove.addEventListener('click', () => deleteTask(task));
    actions.append(move, details, remove); body.append(actions); card.append(body);
    return card;
  }

  async function loadTasks() {
    try {
      const params = new URLSearchParams();
      const priority = document.getElementById('filterPriority').value;
      const assignee = document.getElementById('filterAssignee').value;
      const q = document.getElementById('filterQuery').value.trim();
      if (priority) params.set('priority', priority);
      if (assignee) params.set('assigneeId', assignee);
      if (q) params.set('q', q);
      const suffix = params.toString() ? '?' + params.toString() : '';
      const tasks = await api('/boards/' + boardId + '/tasks' + suffix);
      for (const status of statuses) {
        const column = document.getElementById('col-' + status);
        column.replaceChildren();
        const grouped = tasks.filter(task => task.status === status);
        document.getElementById('count-' + status).textContent = grouped.length;
        if (!grouped.length) column.append(el('p', 'text-secondary small mb-0', 'Brak zadań w tej kolumnie.'));
        for (const task of grouped) column.append(renderTask(task));
      }
    } catch (error) { showMessage(message, error.message); }
  }

  function openTask(task = null) {
    currentTask = task;
    document.getElementById('taskModalTitle').textContent = task ? 'Zadanie: ' + task.title : 'Nowe zadanie';
    document.getElementById('taskTitle').value = task ? task.title : '';
    document.getElementById('taskDescription').value = task ? (task.description || '') : '';
    document.getElementById('taskStatus').value = task ? task.status : 'todo';
    document.getElementById('taskPriority').value = task ? task.priority : 'medium';
    document.getElementById('taskDeadline').value = task && task.deadline ? String(task.deadline).slice(0, 10) : '';
    document.getElementById('taskAssignee').value = task && task.assigneeId ? task.assigneeId : '';
    const created = document.getElementById('taskCreatedAt');
    created.classList.toggle('d-none', !task || !task.createdAt);
    created.textContent = task && task.createdAt ? 'Utworzono: ' + formatDate(String(task.createdAt).slice(0, 10)) : '';
    for (const input of form.querySelectorAll('.is-invalid')) markInvalid(input, false);
    document.getElementById('taskFormMessage').textContent = '';
    modal.show();
  }

  async function saveTask(event) {
    event.preventDefault();
    const title = document.getElementById('taskTitle');
    const description = document.getElementById('taskDescription');
    const deadline = document.getElementById('taskDeadline');
    const invalidTitle = title.value.trim().length < 3 || title.value.trim().length > 100;
    const invalidDescription = description.value.trim().length > 5000;
    const invalidDeadline = deadline.value !== '' && !deadline.validity.valid;
    markInvalid(title, invalidTitle);
    markInvalid(description, invalidDescription);
    markInvalid(deadline, invalidDeadline);
    if (invalidTitle || invalidDescription || invalidDeadline) {
      document.getElementById('taskFormMessage').textContent = invalidTitle
        ? 'Tytuł musi mieć od 3 do 100 znaków.'
        : invalidDescription ? 'Opis może mieć maksymalnie 5000 znaków.' : 'Podaj prawidłowy termin.';
      (invalidTitle ? title : invalidDescription ? description : deadline).focus();
      return;
    }
    document.getElementById('taskFormMessage').textContent = '';
    const payload = {
      title: title.value.trim(),
      description: description.value.trim(),
      status: document.getElementById('taskStatus').value,
      priority: document.getElementById('taskPriority').value,
      deadline: deadline.value || null,
      assigneeId: document.getElementById('taskAssignee').value || null,
      boardId: Number(boardId)
    };
    try {
      await api(currentTask ? '/tasks/' + currentTask.id : '/tasks', currentTask ? 'PUT' : 'POST', payload);
      modal.hide(); showMessage(message, currentTask ? 'Zapisano zmiany.' : 'Dodano zadanie.', 'success'); await loadTasks();
    } catch (error) { document.getElementById('taskFormMessage').textContent = error.message; }
  }

  async function changeStatus(task) {
    const next = task.status === 'done' ? 'todo' : statuses[statuses.indexOf(task.status) + 1];
    try {
      await api('/tasks/' + task.id, 'PUT', {
        title: task.title, description: task.description, status: next,
        priority: task.priority, deadline: task.deadline ? String(task.deadline).slice(0, 10) : null,
        boardId: Number(task.boardId), assigneeId: task.assigneeId
      });
      await loadTasks();
    } catch (error) { showMessage(message, error.message); }
  }

  async function deleteTask(task) {
    if (!confirm('Usunąć zadanie „' + task.title + '”?')) return;
    try { await api('/tasks/' + task.id, 'DELETE'); showMessage(message, 'Usunięto zadanie.', 'success'); await loadTasks(); }
    catch (error) { showMessage(message, error.message); }
  }

  document.getElementById('newTaskBtn').addEventListener('click', () => openTask());
  form.addEventListener('submit', saveTask);
  for (const id of ['filterPriority', 'filterAssignee']) document.getElementById(id).addEventListener('change', loadTasks);
  let searchTimer;
  document.getElementById('filterQuery').addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(loadTasks, 250); });
  document.getElementById('clearFilters').addEventListener('click', () => {
    document.getElementById('filterPriority').value = '';
    document.getElementById('filterAssignee').value = '';
    document.getElementById('filterQuery').value = '';
    loadTasks();
  });

  async function init() {
    await setupHeader();
    if (!boardId || !/^\d+$/.test(boardId)) { location.href = 'boards.html'; return; }
    const [boards] = await Promise.all([api('/boards'), loadUsers()]);
    board = boards.find(item => Number(item.id) === Number(boardId));
    if (!board) { location.href = 'boards.html'; return; }
    document.getElementById('boardTitle').textContent = board.name;
    document.getElementById('breadcrumbName').textContent = board.name;
    document.getElementById('boardDescription').textContent = board.description || '';
    await loadTasks();
  }
  init().catch(error => showMessage(message, error.message));
})();