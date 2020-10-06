/* eslint-disable no-shadow */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import routes from '../routes';
import { hideRemoveChannelModal } from '../reducers/appUI';

const mapStateToProps = (state) => {
  const {
    appUI: { isRemoveChannelModalShown, channelToBeRemoved },
  } = state;
  return { isRemoveChannelModalShown, channelToBeRemoved };
};

const actionCreators = { hideRemoveChannelModal };

const RemoveChannelModal = (props) => {
  const {
    isRemoveChannelModalShown,
    channelToBeRemoved,
    hideRemoveChannelModal,
  } = props;

  const [submitError, setSubmitError] = useState('');

  const removerChannelHandler = async () => {
    const route = routes.channelPath(channelToBeRemoved.id);
    try {
      await axios.delete(route);
      hideRemoveChannelModal();
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  const hideRemoveChannelModalHandler = () => {
    hideRemoveChannelModal();
  };

  if (!isRemoveChannelModalShown) {
    return null;
  }

  return (
    <Modal
      show={isRemoveChannelModalShown}
      onHide={hideRemoveChannelModalHandler}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Confirm to remove channel &quot;
          {channelToBeRemoved.name}
          &quot;
        </Modal.Title>
      </Modal.Header>

      {submitError && (
        <Modal.Body>
          <div className="invalid-feedback d-block">{submitError}</div>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button variant="secondary" onClick={hideRemoveChannelModalHandler}>
          Cancel
        </Button>
        <Button variant="warning" onClick={removerChannelHandler}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(RemoveChannelModal);
