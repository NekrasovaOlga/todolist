import * as storage from './serviceStorage.js';

// Создание листа с заметками в storage
const createList = (list, name) => {
  let newList = storage.getStorage();
  if (!newList[name]) {
    newList[name] = new Array(list);
    newList = Object.assign({}, newList);
  } else {
    newList[name].push(list);
  }
  storage.setStorage(newList);
};

// Создание модального окна для авторизации
const createModal = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay', 'is-visible');

  const form = document.createElement('form');
  form.classList.add('form-auth');

  form.insertAdjacentHTML('beforeend', `
    <button class='close' type='button'></button>
    <h2 class='form-title'>Авторизуйтесь</h2>
  <div class='form-group'>
  <input class='form-input pb-30' type='text' 
  name='name' id='name' placeholder='Ваше имя' required>
  </div>
  <button type='submit' class='btn btn-primary mb-30'>Авторизоваться</button>
  </div>
    `);

  overlay.append(form);
  overlay.form = form;

  return {
    overlay,
    formAuthCreate: form,
  };
};

// Создание строки с заметкой
const createRow = ({id, title, status, className}) => {
  const tr = document.createElement('tr');
  const idRow = document.createElement('td');
  const titleRow = document.createElement('td');
  const statusRow = document.createElement('td');
  const buttons = document.createElement('td');
  const buttonDanger = document.createElement('button');
  const buttonSuccess = document.createElement('button');

  tr.classList.add(className);
  idRow.classList.add('table-id');
  titleRow.classList.add('task');
  statusRow.classList.add('status');
  buttonDanger.classList.add('btn', 'btn-danger');
  buttonSuccess.classList.add('btn', 'btn-success');

  idRow.textContent = id;
  titleRow.textContent = title;
  statusRow.textContent = status;
  buttonDanger.textContent = `Удалить`;
  buttonSuccess.textContent = `Завершить`;

  titleRow.contentEditable = true;

  buttons.append(buttonDanger);
  buttons.append(buttonSuccess);

  if (tr.classList.contains('table-success')) {
    buttonSuccess.disabled = true;
    titleRow.contentEditable = false;
  }

  tr.append(idRow, titleRow, statusRow, buttons);

  return tr;
};

// Создание таблицы
const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  tr.insertAdjacentHTML(
      'beforeend',
      ` <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
        `,
  );
  const tbody = document.createElement('tbody');

  thead.append(tr);

  table.append(thead, tbody);

  table.tbody = tbody;

  return table;
};

// HTML верстка формы для добавления заметок
const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'form-list');

  form.insertAdjacentHTML('beforeend', `<label class='form-group me-3 mb-0'>
    <input type='text' name='title' 
    class='form-control' placeholder='ввести задачу'>
    </label>
    <select name='importance' id='importance' class='me-3'>
    <option value='table-light'>Обычная</option>
    <option value='table-warning'>Важная</option>
    <option value='table-danger'>Срочная</option>
    </select>
    <button type='submit' class='btn btn-primary me-3' disabled>
      Сохранить
    </button>

    <button type='reset' class='btn btn-warning'>
      Очистить
    </button>`);

  return form;
};
export {createList, createModal, createRow, createTable, createForm};
