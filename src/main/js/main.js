import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// How browser history is handled is different in v4, so this needs to be accounted for later
// import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import AppProvider from './AppProvider';
import configureStore from './configureStore';


// Get the application-wide store instance, prepopulating with state from the server where available.
// ! Don't have server-rendering yet, might add later
const initialState = window.initialReduxState;
const store = configureStore(initialState);

const history = syncHistoryWithStore(createBrowserHistory(), store);

const indexRoot = document.getElementById('index_root');

function doRender() {
  ReactDOM.render(
    <AppContainer>
      <AppProvider store={ store } history={ history }/>
    </AppContainer>,
    indexRoot
  );
}

doRender();
if (module.hot) {
  module.hot.accept('./AppProvider', () => {
    doRender();
  });
}
