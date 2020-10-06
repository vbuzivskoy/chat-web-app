/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = (state) => ({ messages: messagesSelector(state) });

const Messages = (props) => {
  const { messages } = props;
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

export default connect(mapStateToProps)(Messages);
