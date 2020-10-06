/* eslint-disable no-shadow */

import React, { useContext } from 'react';
import { connect } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import axios from 'axios';

import routes from '../routes';
import UsernameContext from '../username-context';

const mapStateToProps = (state) => {
  const { channels: { currentChannelId } } = state;
  return { currentChannelId };
};

const createNewMessageData = (text, username) => ({
  data: {
    type: 'messeges',
    attributes: {
      text,
      username,
    },
  },
});

const validate = ({ text }) => {
  const errors = {};

  if (!text) {
    errors.text = 'To send a message type something first';
  }
  return errors;
};

const AddMessageForm = (props) => {
  const { currentChannelId } = props;
  const username = useContext(UsernameContext);

  return (
    <Formik
      initialValues={{
        text: '',
      }}
      validate={validate}
      onSubmit={async ({ text }, { resetForm, setErrors }) => {
        const newMessageData = createNewMessageData(text, username);
        const route = routes.channelMessagesPath(currentChannelId);
        try {
          await axios.post(route, newMessageData);
          resetForm({});
        } catch (error) {
          setErrors({ submit: error.message });
        }
      }}
    >
      {({ errors }) => (
        <Form>
          <Field name="text" className="form-control" autoComplete="off" autoFocus />
          <ErrorMessage name="text">
            {(msg) => <div className="invalid-feedback d-block">{msg}</div>}
          </ErrorMessage>
          {errors.submit && <div className="invalid-feedback d-block">{errors.submit}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default connect(mapStateToProps)(AddMessageForm);
