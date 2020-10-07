/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const getMessages = (state) => state.messages;
const getCurrentChannelId = (state) => state.channels.currentChannelId;

const messagesSelector = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, currentChannelId) => (
    messages.filter(({ channelId }) => channelId === currentChannelId)
  ),
);

const Messages = () => {
  const messages = useSelector(messagesSelector);

  if (messages.length === 0) {
    return null;
  }

  return (
    <>
      {messages.map(({ id, text, username }) => (
        <div key={id}>
          <b>{username}</b>: {text}
        </div>
      ))}
    </>
  );
};

export default Messages;
