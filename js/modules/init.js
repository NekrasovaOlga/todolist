import * as storage from './serviceStorage.js';

import {renderList, renderTodo} from './renderElement.js';

import {formSubmit} from './form.js';

import * as option from './optionsElem.js';

// Вызов приложения
export const init = (app, userName) => {
  const list = storage.getStorage();
  const name = userName;
  const {form, table, tbody} = renderTodo();
  const userObj = !list[name] ? [] : list[name];
  const listPage = renderList(tbody, userObj);
  formSubmit(form, table.tbody, name);
  table.append(listPage);
  console.log(userObj);
  // elem.createList(userObj, name);
  option.editTextStorage(table, name);

  app.append(form, table);

  option.formReset(form, app);
  option.changeButton(table, name);
};

export default init;
