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
import { hideEditChannelModal } from '../reducers/appUI';

const mapStateToProps = (state) => {
  const {
    appUI: { isEditChannelModalShown, channelToBeEdited },
  } = state;
  return { isEditChannelModalShown, channelToBeEdited };
};

const actionCreators = { hideEditChannelModal };

const createUpdatedChannelData = (channel) => ({
  data: {
    type: 'channel',
    attributes: { ...channel },
  },
});

const validate = ({ name }) => {
  const errors = {};

  if (!name) {
    errors.name = 'Channel must have a name';
  }
  return errors;
};

const EditChannelModal = (props) => {
  const {
    isEditChannelModalShown,
    channelToBeEdited,
    hideEditChannelModal,
  } = props;

  const onEditChannelHandler = async (values, { setErrors }) => {
    const updatedChannelData = createUpdatedChannelData({ ...channelToBeEdited, ...values });
    const route = routes.channelPath(channelToBeEdited.id);
    try {
      await axios.patch(route, updatedChannelData);
      hideEditChannelModal();
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const hideEditChannelModalHandler = () => {
    hideEditChannelModal();
  };

  if (!isEditChannelModalShown) {
    return null;
  }

  return (
    <Modal
      show={isEditChannelModalShown}
      onHide={hideEditChannelModalHandler}
      animation={false}
      restoreFocus
      centered
    >
      <Formik
        initialValues={{
          name: channelToBeEdited.name,
        }}
        validate={validate}
        onSubmit={onEditChannelHandler}
      >
        {({ errors }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Edit channel</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <label htmlFor="name">Channel name</label>
              <Field
                name="name"
                className="form-control"
                autoComplete="off"
                autoFocus
                onFocus={(e) => e.currentTarget.select()}
              />
              <ErrorMessage name="name">
                {(msg) => <div className="invalid-feedback d-block">{msg}</div>}
              </ErrorMessage>
              {errors.submit && (
                <div className="invalid-feedback d-block">{errors.submit}</div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={hideEditChannelModalHandler}>
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

export default connect(mapStateToProps, actionCreators)(EditChannelModal);
