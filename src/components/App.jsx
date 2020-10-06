/* eslint-disable no-shadow */

import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

import Channels from './Channels';
import Messages from './Messages';
import AddMessageForm from './AddMessageForm';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import EditChannelModal from './EditChannelModal';
import { showAddChannelModal } from '../reducers/appUI';

const actionCreators = { showAddChannelModal };

const App = (props) => {
  const { showAddChannelModal } = props;

  const showNewCannelModalHandler = () => {
    showAddChannelModal();
  };

  return (
    <>
      <Row className="h-100">
        <Col xs lg="3" className="border-right">
          <div className="d-flex mb-2">
            <span>Channels</span>
            <Button
              className="ml-auto p-0"
              size="sm"
              variant="link"
              onClick={showNewCannelModalHandler}
            >
              <PlusCircle />
            </Button>
          </div>
          <Channels />
        </Col>
        <Col>
          <div className="d-flex flex-column h-100">
            <div id="messages-box" className="chat-messages overflow-auto mb-3">
              <Messages />
            </div>
            <div className="mt-auto">
              <AddMessageForm />
            </div>
          </div>
        </Col>
      </Row>
      <AddChannelModal />
      <RemoveChannelModal />
      <EditChannelModal />
    </>
  );
};

export default connect(null, actionCreators)(App);
