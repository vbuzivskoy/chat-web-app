import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import routes from '../routes';
import { removeChannel } from '../reducers/channels';
import { hideRemoveChannelModal } from '../reducers/appUI';

const mapStateToProps = (state) => {
  const {
    appUI: { isRemoveChannelModalShown, channelToBeRemoved },
  } = state;
  return { isRemoveChannelModalShown, channelToBeRemoved };
};

const actionCreators = { removeChannel, hideRemoveChannelModal };

const RemoveChannelModal = (props) => {
  const {
    isRemoveChannelModalShown,
    channelToBeRemoved,
    removeChannel, // eslint-disable-line no-shadow
    hideRemoveChannelModal, // eslint-disable-line no-shadow
  } = props;

  const [submitError, setSubmitError] = useState('');

  const removerChannelHandler = async () => {
    const route = routes.channelPath(channelToBeRemoved.id);
    try {
      await axios.delete(route);
      removeChannel({ id: channelToBeRemoved.id });
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
