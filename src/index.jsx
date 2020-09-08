import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

import '../assets/application.scss';

// import faker from 'faker';
// eslint-disable-next-line
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const renderApp = ({ channels, messages, currentChannelId }) => (
  <App
    channels={channels}
    messages={messages}
    currentChannelId={currentChannelId}
  />
);

ReactDOM.render(
  renderApp(gon),
  document.getElementById('chat'),
);

console.log('it works!');
console.log('gon', gon);
