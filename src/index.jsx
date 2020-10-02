import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import '../assets/application.scss';

import faker from 'faker';
import gon from 'gon';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

import rootReducer from './reducers';
import App from './components/App';
import UsernameContext from './username-context';
import listenSockets from './sockets';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const currentUsernameCooky = Cookies.get('username');
const currentUsername = currentUsernameCooky
  || faker.fake('{{name.lastName}}_{{name.firstName}}{{random.number}}');
Cookies.set('username', currentUsername);

const store = configureStore({
  reducer: rootReducer,
  preloadedState: gon,
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
