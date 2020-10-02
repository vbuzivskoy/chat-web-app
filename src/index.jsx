import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';

import '../assets/application.scss';

import faker from 'faker';
import gon from 'gon';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import Rollbar from 'rollbar';
import rollbarMiddleware from 'rollbar-redux-middleware';

import rootReducer from './reducers';
import App from './components/App';
import UsernameContext from './username-context';
import listenSockets from './sockets';

const nodeEnv = process.env.NODE_ENV;

if (nodeEnv !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbar = new Rollbar({
  accessToken: '17eba661a9c945909f8231950ea31781',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: (nodeEnv === 'production'),
});
const rollbarRedux = rollbarMiddleware(rollbar);

const currentUsernameCooky = Cookies.get('username');
const currentUsername = currentUsernameCooky
  || faker.fake('{{name.lastName}}_{{name.firstName}}{{random.number}}');
Cookies.set('username', currentUsername);

const store = configureStore({
  reducer: rootReducer,
  preloadedState: gon,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rollbarRedux),
});

ReactDOM.render(
  <UsernameContext.Provider value={currentUsername}>
    <Provider store={store}>
      <App />
    </Provider>
  </UsernameContext.Provider>,
  document.getElementById('chat'),
);

const socket = io();
listenSockets(socket, store);
