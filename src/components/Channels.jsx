import React from 'react';
import { connect } from 'react-redux';
import { XCircle, Pencil } from 'react-bootstrap-icons';
import { ListGroup, Button } from 'react-bootstrap';

import { setCurrentChannelId } from '../reducers/channels';
import { showRemoveChannelModal, showEditChannelModal } from '../reducers/appUI';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;
  return { channels, currentChannelId };
};

const actionCreators = { setCurrentChannelId, showRemoveChannelModal, showEditChannelModal };

const Channels = (props) => {
  const {
    channels,
    currentChannelId,
    setCurrentChannelId, // eslint-disable-line no-shadow
    showRemoveChannelModal, // eslint-disable-line no-shadow
    showEditChannelModal, // eslint-disable-line no-shadow
  } = props;

  if (channels.length === 0) {
    return null;
  }

  const getCurrentChannelIdHandler = (id) => () => setCurrentChannelId({ currentChannelId: id });

  const getRemoveChannelHandler = (channel) => () => {
    showRemoveChannelModal({ channel });
  };

  const getEditChannelHandler = (channel) => () => {
    showEditChannelModal({ channel });
  };

  return (
    <ListGroup>
      {channels.map((channel) => {
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
                onClick={getEditChannelHandler(channel)}
              >
                <Pencil />
              </Button>
            )}
            {!removable || (
              <Button
                variant="link"
                className="float-right"
                size="sm"
                onClick={getRemoveChannelHandler(channel)}
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
