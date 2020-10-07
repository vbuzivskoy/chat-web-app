/* eslint-disable no-shadow */

import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import routes from '../../routes';

const RemoveChannelModal = (props) => {
  const { channel, onHide } = props;
  const [submitError, setSubmitError] = useState('');

  const removerChannelHandler = async () => {
    const route = routes.channelPath(channel.id);
    try {
      await axios.delete(route);
      onHide();
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <Modal
      show
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Confirm to remove channel &quot;
          {channel.name}
          &quot;
        </Modal.Title>
      </Modal.Header>

      {submitError && (
        <Modal.Body>
          <div className="invalid-feedback d-block">{submitError}</div>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="warning" onClick={removerChannelHandler}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
