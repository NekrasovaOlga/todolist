// Получение заметок отправка в storage
const getStorage = () =>
  (localStorage.getItem('list') ?
  JSON.parse(localStorage.getItem('list')) : []);

// Добавление заметки отправка в storage
const setStorage = (list) => {
  localStorage.setItem('list', JSON.stringify(list));
};

// Выполнение заметки отправка в storage
const successStorage = (list, name) => {
  const allList = getStorage();
  allList[name].map((item) => {
    if (item.id === list.id) {
      item.status = 'Завершено';
      item.className = 'table-success';
      return item;
    } else {
      return item;
    }
  });
  setStorage(allList);
};
// Удаление заметки отправка в storage
const removeStorage = (list, name) => {
  const allList = getStorage();
  const removeList = allList[name].filter((item) => item.id !== list.id);
  for (let i = 0; i < removeList.length; i++) {
    removeList[i].id = i + 1;
  }
  allList[name] = removeList;
  setStorage(allList);
};

export {getStorage, setStorage, successStorage, removeStorage};
