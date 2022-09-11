import * as storage from './serviceStorage.js';
// События на кнопки Удалить и Завершить
const changeButton = (table, name) => {
  table.addEventListener('click', (e) => {
    const target = e.target;

    let allList = storage.getStorage();
    allList = allList[name];

    if (target.classList.contains('btn')) {
      const listRow = target.closest('tr');
      const listId = listRow.firstElementChild.textContent;
      const listStatus = allList.filter((item) => item.id === +listId);

      if (target.classList.contains('btn-danger')) {
        // удаление заметки
        const removeQuestion = confirm('Точно удалить задачу?');
        if (removeQuestion) {
          listRow.remove();
          const allRow = table.querySelectorAll('.table-id');
          // Перерасчет id
          for (let i = 0; i < allRow.length; i++) {
            allRow[i].textContent = i + 1;
          }

          storage.removeStorage(...listStatus, name);
        }
      }
      // Выполнение заметки
      if (target.classList.contains('btn-success')) {
        listRow.className = 'table-success';
        listRow.querySelector('.task').contentEditable = false;

        listRow.querySelector('.status').textContent = 'Завершено';
        target.closest('.btn-success').disabled = true;

        storage.successStorage(...listStatus, name);
      }
    }
  });
};

// Очистка формы
const formReset = (form) => {
  const buttonReset = form.querySelector('.btn-warning');
  const buttonSubmit = form.querySelector('.btn-primary');

  buttonReset.addEventListener('click', () => (buttonSubmit.disabled = true));
};

// Редактирование заметки отправка в storage
const editTextStorage = (table, name) => {
  table.addEventListener('input', (e) => {
    const allList = storage.getStorage();
    const target = e.target.closest('tr').firstElementChild.textContent;
    const task = e.target.closest('tr').querySelector('.task').textContent;

    allList[name].map((item) => {
      if (item.id === +target) {
        item.title = task;
        return item;
      } else {
        return item;
      }
    });
    storage.setStorage(allList);
  });
};

export {changeButton, formReset, editTextStorage};
