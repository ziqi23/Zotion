import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store'
import * as sessionActions from './store/session';
import * as pageActions from './store/page';
import * as teamActions from './store/team';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faClock, faBuildingUser, faGear, faFileLines, faChevronRight, faPlus, faCommentDots, faStar, faEllipsis, faPenToSquare, faEllipsisVertical, faMap, faCheck, faTrashCan, faArrowLeft} from '@fortawesome/free-solid-svg-icons'

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
  window.pageActions = pageActions;
  window.teamActions = teamActions;
}

library.add(faMagnifyingGlass, faClock, faBuildingUser, faGear, faFileLines, faChevronRight, faPlus, faCommentDots, faStar, faEllipsis, faPenToSquare, faEllipsisVertical, faMap, faCheck, faTrashCan, faArrowLeft)

const renderApp = () => {
  const domNode = document.getElementById('root')
  // domNode.addEventListener('contextmenu', (e) => e.preventDefault())
  const root = createRoot(domNode)
  
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

if (sessionStorage.getItem('X-CSRF-Token') === null || sessionStorage.getItem('currentUser') === null) {
  store.dispatch(sessionActions.restoreSession()).then(renderApp);
} else {
  renderApp();
}