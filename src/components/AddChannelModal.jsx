/* eslint-disable no-shadow, jsx-a11y/label-has-associated-control */

import React from 'react';
import { connect } from 'react-redux';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from 'formik';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import routes from '../routes';
import { addChannel, setCurrentChannelId } from '../reducers/channels';
import { hideAddChannelModal } from '../reducers/appUI';

const mapStateToProps = (state) => {
  const {
    appUI: { isAddChannelModalShown },
  } = state;
  return { isAddChannelModalShown };
};

const actionCreators = { addChannel, hideAddChannelModal, setCurrentChannelId };

const createNewChannelData = (name) => ({
  data: {
    type: 'channel',
    attributes: { name },
  },
});

const validate = ({ name }) => {
  const errors = {};

  if (!name) {
    errors.name = 'New channel must have a name';
  }
  return errors;
};

const AddChannelModal = (props) => {
  const {
    isAddChannelModalShown,
    addChannel,
    hideAddChannelModal,
    setCurrentChannelId,
  } = props;

  const onAddChannelHandler = async ({ name }, { setErrors }) => {
    const newChannelData = createNewChannelData(name);
    const route = routes.channelsPath();
    try {
      const response = await axios.post(route, newChannelData);
      const { data: { data: { attributes: channel } } } = response;
      addChannel({ channel });
      setCurrentChannelId({ currentChannelId: channel.id });
      hideAddChannelModal();
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const hideAddChannelModalHandler = () => {
    hideAddChannelModal();
  };

  return (
    <Modal
      show={isAddChannelModalShown}
      onHide={hideAddChannelModalHandler}
      animation={false}
      restoreFocus
      centered
    >
      <Formik
        initialValues={{
          name: '',
        }}
        validate={validate}
        onSubmit={onAddChannelHandler}
      >
        {({ errors }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Add new channel</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <label htmlFor="channelName">Channel name</label>
              <Field
                id="channelName"
                name="name"
                className="form-control"
                autoFocus
                autoComplete="off"
              />
              <ErrorMessage name="name">
                {(msg) => <div className="invalid-feedback d-block">{msg}</div>}
              </ErrorMessage>
              {errors.submit && (
                <div className="invalid-feedback d-block">{errors.submit}</div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={hideAddChannelModalHandler}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">Save</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(AddChannelModal);
