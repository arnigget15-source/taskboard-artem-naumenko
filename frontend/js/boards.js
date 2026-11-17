(() => {
  const { api, showMessage, setupHeader } = window.TaskBoard;
  const message = document.getElementById('pageMessage');
  const list = document.getElementById('boardsList');
  const empty = document.getElementById('emptyBoards');
  const modal = new bootstrap.Modal(document.getElementById('boardModal'));
  const form = document.getElementById('boardForm');
  let boards = [];
  let editingId = null;

  function addText(parent, tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text || '';
    parent.append(node);
    return node;
  }

  function render() {
    list.replaceChildren();
    empty.classList.toggle('d-none', boards.length !== 0);
    for (const board of boards) {
      const col = document.createElement('div'); col.className = 'col-12 col-md-6 col-xl-4';
      const card = document.createElement('article'); card.className = 'card board-card';
      const body = document.createElement('div'); body.className = 'card-body';
      addText(body, 'h2', 'card-title', board.name);
      addText(body, 'p', 'card-text', board.description || 'Brak opisu');
      const meta = document.createElement('div'); meta.className = 'board-meta';
      addText(meta, 'div', '', 'Utworzył(a): ' + board.ownerFirstName + ' ' + board.ownerLastName);
      addText(meta, 'div', '', 'Aktywne zadania: ' + board.activeTasks);
      body.append(meta); card.append(body);
      const footer = document.createElement('div'); footer.className = 'card-footer';
      const open = document.createElement('a'); open.className = 'btn btn-primary btn-sm'; open.href = 'board.html?id=' + encodeURIComponent(board.id); open.textContent = 'Otwórz';
      const edit = document.createElement('button'); edit.className = 'btn btn-outline-primary btn-sm'; edit.textContent = 'Edytuj'; edit.addEventListener('click', () => openEditor(board));
      const remove = document.createElement('button'); remove.className = 'btn btn-outline-danger btn-sm'; remove.textContent = 'Usuń'; remove.addEventListener('click', () => deleteBoard(board));
      footer.append(open, edit, remove); card.append(footer); col.append(card); list.append(col);
    }
  }

  async function loadBoards() {
    try { boards = await api('/boards'); render(); }
    catch (error) { showMessage(message, error.message); }
  }

  function openEditor(board = null) {
    editingId = board ? board.id : null;
    document.getElementById('boardModalTitle').textContent = board ? 'Edytuj tablicę' : 'Nowa tablica';
    document.getElementById('boardName').value = board ? board.name : '';
    document.getElementById('boardDescription').value = board ? (board.description || '') : '';
    document.getElementById('boardName').classList.remove('is-invalid');
    modal.show();
  }

  async function deleteBoard(board) {
    if (!confirm('Usunąć tablicę „' + board.name + '”?')) return;
    try { await api('/boards/' + board.id, 'DELETE'); showMessage(message, 'Usunięto tablicę.', 'success'); await loadBoards(); }
    catch (error) { showMessage(message, error.message); }
  }

  document.getElementById('newBoardBtn').addEventListener('click', () => openEditor());
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('boardName');
    const description = document.getElementById('boardDescription');
    if (!name.value.trim()) { name.classList.add('is-invalid'); return; }
    name.classList.remove('is-invalid');
    try {
      await api(editingId ? '/boards/' + editingId : '/boards', editingId ? 'PUT' : 'POST', {
        name: name.value.trim(), description: description.value.trim()
      });
      modal.hide(); showMessage(message, editingId ? 'Zapisano zmiany.' : 'Dodano tablicę.', 'success'); await loadBoards();
    } catch (error) { showMessage(message, error.message); }
  });

  setupHeader().then(loadBoards).catch(error => showMessage(message, error.message));
})();
