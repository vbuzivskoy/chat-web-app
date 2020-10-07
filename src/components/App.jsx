/* eslint-disable no-shadow */

import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

import Channels from './Channels';
import Messages from './Messages';
import getModal from './modals';
import AddMessageForm from './AddMessageForm';
import { setModalInfo } from '../reducers/appUI';

const mapStateToProps = (state) => {
  const { appUI: { modalInfo } } = state;
  return { modalInfo };
};

const actionCreators = { setModalInfo };

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const ModalComponent = getModal(modalInfo.type);
  return <ModalComponent channel={modalInfo.channel} onHide={hideModal} />;
};

const App = (props) => {
  const { modalInfo, setModalInfo } = props;

  const hideModal = () => setModalInfo({ modalInfo: { type: null, channel: null } });

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
              onClick={() => setModalInfo({ modalInfo: { type: 'adding', channel: null } })}
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
      {renderModal({ modalInfo, hideModal })}
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(App);
