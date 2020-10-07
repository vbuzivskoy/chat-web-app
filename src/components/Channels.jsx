import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { XCircle, Pencil } from 'react-bootstrap-icons';
import { ListGroup, Button } from 'react-bootstrap';

import { setCurrentChannelId } from '../reducers/channels';
import { setModalInfo } from '../reducers/appUI';

const Channels = () => {
  const chatChannels = useSelector((state) => state.channels.chatChannels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  if (chatChannels.length === 0) {
    return null;
  }

  const getCurrentChannelIdHandler = (id) => () => (
    dispatch(setCurrentChannelId({ currentChannelId: id }))
  );

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
                onClick={() => dispatch(setModalInfo({ modalInfo: { type: 'editing', channel } }))}
              >
                <Pencil />
              </Button>
            )}
            {!removable || (
              <Button
                variant="link"
                className="float-right"
                size="sm"
                onClick={() => dispatch(setModalInfo({ modalInfo: { type: 'removing', channel } }))}
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

export default Channels;
