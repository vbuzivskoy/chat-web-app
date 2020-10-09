import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { FaPaperPlane } from 'react-icons/fa';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import i18n from 'i18next';

import routes from '../routes';
import UsernameContext from '../username-context';

const createNewMessageData = (text, username) => ({
  data: {
    type: 'messeges',
    attributes: {
      text,
      username,
    },
  },
});

const AddMessageForm = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const username = useContext(UsernameContext);

  const validationSchema = yup.object().shape({
    text: yup.string()
      .required(i18n.t('errors.epmtyMessage')),
  });

  return (
    <Formik
      initialValues={{
        text: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async ({ text }, { resetForm, setErrors }) => {
        const newMessageData = createNewMessageData(text, username);
        const route = routes.channelMessagesPath(currentChannelId);
        try {
          await axios.post(route, newMessageData);
          resetForm({});
        } catch (error) {
          setErrors({ submit: i18n.t('errors.networkError') });
        }
      }}
    >
      {({
        errors, isSubmitting, isValid, dirty,
      }) => (
        <Form>
          <div className="input-group mb-3">
            <Field name="text" className="form-control" autoComplete="off" autoFocus disabled={isSubmitting} />
            <div className="input-group-append">
              <Button
                className="align-middle"
                variant="primary"
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
              >
                <FaPaperPlane />
              </Button>
            </div>
          </div>
          <ErrorMessage name="text">
            {(msg) => <div className="invalid-feedback d-block">{msg}</div>}
          </ErrorMessage>
          {errors.submit && <div className="invalid-feedback d-block">{errors.submit}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default AddMessageForm;
