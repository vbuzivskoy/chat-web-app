/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from 'formik';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import i18n from 'i18next';

import routes from '../../routes';
import { setCurrentChannelId } from '../../reducers/channels';

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
  const { onHide } = props;
  const dispatch = useDispatch();

  const onAddChannelHandler = async ({ name }, { setErrors }) => {
    const newChannelData = createNewChannelData(name);
    const route = routes.channelsPath();
    try {
      const response = await axios.post(route, newChannelData);
      const { data: { data: { attributes: channel } } } = response;
      // I don't know yet how to make shure that the new channel is already added to store!!!
      dispatch(setCurrentChannelId({ currentChannelId: channel.id }));
      onHide();
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  return (
    <Modal
      show
      onHide={onHide}
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
              <Modal.Title>{i18n.t('addChannelModal.title')}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <label htmlFor="channelName">{i18n.t('channelNameLable')}</label>
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
              <Button variant="secondary" onClick={onHide}>
                {i18n.t('cancelButtonText')}
              </Button>
              <Button variant="primary" type="submit">{i18n.t('saveButtonText')}</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;
