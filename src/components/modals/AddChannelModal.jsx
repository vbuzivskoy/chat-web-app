/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
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

const AddChannelModal = (props) => {
  const { onHide } = props;
  const dispatch = useDispatch();
  const inputElement = useRef(null);

  useEffect(() => {
    inputElement.current.focus();
  });

  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, i18n.t('errors.minMaxChannelNameLength'))
      .max(20, i18n.t('errors.minMaxChannelNameLength'))
      .required(i18n.t('errors.emptyChannelName')),
  });

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
      setErrors({ submit: i18n.t('errors.networkError') });
    }
  };

  return (
    <Modal
      show
      onHide={onHide}
      animation={false}
      centered
    >
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        onSubmit={onAddChannelHandler}
      >
        {({
          errors, isSubmitting, isValid, dirty,
        }) => (
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
                autoComplete="off"
                disabled={isSubmitting}
                innerRef={inputElement}
              />
              {errors.name && (
                <div className="invalid-feedback d-block">{errors.name}</div>
              )}
              {errors.submit && (
                <div className="invalid-feedback d-block">{errors.submit}</div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                {i18n.t('cancelButtonText')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
              >
                {i18n.t('saveButtonText')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;
