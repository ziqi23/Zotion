import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store'
import * as sessionActions from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
}

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (sessionStorage.getItem('X-CSRF-Token') === null || sessionStorage.getItem('currentUser') === null) {
  store.dispatch(sessionActions.restoreSession()).then(renderApp);
} else {
  renderApp();
}