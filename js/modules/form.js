import * as storage from './serviceStorage.js';
import * as elem from './createElement.js';
import {
  renderListPage,
} from './renderElement.js';

import init from './init.js';

// Форма отправки заметки
const formSubmit = (form, tbody, name) => {
  const buttonSubmit = form.querySelector('.btn-primary');

  form.addEventListener('input', (e) => {
      (form.title.value !== '') ? buttonSubmit.disabled = false :
      buttonSubmit.disabled = true;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const list = storage.getStorage();
    const nameUser = !list[name] ? [] : list[name];

    const formObj = new FormData(e.target);
    const newList = Object.fromEntries(formObj);

    newList.status = 'В процессе';
    newList.id = nameUser.length + 1;
    newList.className = newList.importance;

    elem.createList(newList, name);
    renderListPage(newList, tbody);

    form.title.value = '';
    buttonSubmit.disabled = true;
  });
};

// Вызов модального окна с авторизацией
const formAuth = (form, app, overlay) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formObj = new FormData(e.target);
    const newList = Object.fromEntries(formObj);
    init(app, newList.name);

    overlay.classList.remove('is-visible');
  });
};

export {
  formSubmit,
  formAuth,
};
