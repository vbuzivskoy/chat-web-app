/* eslint-disable no-shadow */

import React from 'react';
import { connect } from 'react-redux';
import { XCircle, Pencil } from 'react-bootstrap-icons';
import { ListGroup, Button } from 'react-bootstrap';

import { setCurrentChannelId } from '../reducers/channels';
import { setModalInfo } from '../reducers/appUI';

const mapStateToProps = (state) => {
  const { channels: { chatChannels, currentChannelId } } = state;
  return { chatChannels, currentChannelId };
};

const actionCreators = { setCurrentChannelId, setModalInfo };

const Channels = (props) => {
  const {
    chatChannels,
    currentChannelId,
    setCurrentChannelId,
    setModalInfo,
  } = props;

  if (chatChannels.length === 0) {
    return null;
  }

  const getCurrentChannelIdHandler = (id) => () => setCurrentChannelId({ currentChannelId: id });

  return (
    <ListGroup>
      {chatChannels.map((channel) => {
        const { id, name, removable } = channel;
        const channelButtonVariant = id === currentChannelId ? 'primary' : 'link';

        return (
          <ListGroup.Item key={id}>
            <Button
              variant={channelButtonVariant}
              className="float-left"
              onClick={getCurrentChannelIdHandler(id)}
            >
              {name}
            </Button>
            {!removable || (
              <Button
                variant="link"
                className="float-right"
                size="sm"
                onClick={() => setModalInfo({ modalInfo: { type: 'editing', channel } })}
              >
                <Pencil />
              </Button>
            )}
            {!removable || (
              <Button
                variant="link"
                className="float-right"
                size="sm"
                onClick={() => setModalInfo({ modalInfo: { type: 'removing', channel } })}
              >
                <XCircle />
              </Button>
            )}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default connect(mapStateToProps, actionCreators)(Channels);
