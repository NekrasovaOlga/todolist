import * as elem from './modules/createElement.js';

import { formAuth } from './modules/form.js';

const appInit = () => {
  const app = document.querySelector('.app-container');
  app.className =
    'vh-100 w-100 d-flex align-items-center justify-content-center flex-column';
  const { overlay, formAuthCreate } = elem.createModal();

  app.append(overlay);

  formAuth(formAuthCreate, app, overlay);
};
appInit();
