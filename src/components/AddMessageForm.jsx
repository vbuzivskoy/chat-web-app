import React, { useContext } from 'react';
import { connect } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import axios from 'axios';

import routes from '../routes';
import { addMessage } from '../reducers/messages';
import UsernameContext from '../username-context';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const actionCreators = { addMessage };

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
  const { currentChannelId, addMessage } = props; // eslint-disable-line no-shadow
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
          const response = await axios.post(route, newMessageData);
          const { data: { data: { attributes: message } } } = response;
          addMessage({ message });
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

export default connect(mapStateToProps, actionCreators)(AddMessageForm);
