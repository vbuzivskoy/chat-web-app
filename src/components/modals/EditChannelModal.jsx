/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import i18n from 'i18next';

import routes from '../../routes';

const createUpdatedChannelData = (channel) => ({
  data: {
    type: 'channel',
    attributes: { ...channel },
  },
});

const EditChannelModal = (props) => {
  const { onHide, channel } = props;

  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, i18n.t('errors.minMaxChannelNameLength'))
      .max(20, i18n.t('errors.minMaxChannelNameLength'))
      .required(i18n.t('errors.emptyChannelName')),
  });

  const onEditChannelHandler = async (values, { setErrors }) => {
    const updatedChannelData = createUpdatedChannelData({ ...channel, ...values });
    const route = routes.channelPath(channel.id);
    try {
      await axios.patch(route, updatedChannelData);
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
          name: channel.name,
        }}
        validationSchema={validationSchema}
        onSubmit={onEditChannelHandler}
      >
        {({ errors }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>{i18n.t('editChannelModal.title')}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <label htmlFor="name">{i18n.t('channelNameLable')}</label>
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

export default EditChannelModal;
