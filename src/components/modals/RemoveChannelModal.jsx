/* eslint-disable no-shadow */

import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import i18n from 'i18next';

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
          {i18n.t('removeChannelModal.title', { channelName: channel.name })}
        </Modal.Title>
      </Modal.Header>

      {submitError && (
        <Modal.Body>
          <div className="invalid-feedback d-block">{submitError}</div>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {i18n.t('cancelButtonText')}
        </Button>
        <Button variant="warning" onClick={removerChannelHandler}>{i18n.t('removeButtonText')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
