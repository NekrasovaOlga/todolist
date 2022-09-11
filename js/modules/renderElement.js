import * as elem from './createElement.js';

// Создание листа с заметками на странице
const renderListPage = (list, tbody) => {
  tbody.append(elem.createRow(list));
};
// Создание листа с заметками на странице
const renderList = (list, data) => {
  const contacts = data.map(elem.createRow);
  list.append(...contacts);

  return list;
};
// Рендер todo листа
const renderTodo = () => {
  const form = elem.createForm();
  const table = elem.createTable();
  return {
    form,
    table,
    tbody: table.tbody,
  };
};

export {renderListPage, renderList, renderTodo};
