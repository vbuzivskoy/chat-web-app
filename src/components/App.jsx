import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { BsPlusCircle } from 'react-icons/bs';
import i18n from 'i18next';

import Channels from './Channels';
import Messages from './Messages';
import getModal from './modals';
import AddMessageForm from './AddMessageForm';
import { setModalInfo } from '../reducers/appUI';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const ModalComponent = getModal(modalInfo.type);
  return <ModalComponent channel={modalInfo.channel} onHide={hideModal} />;
};

const App = () => {
  const modalInfo = useSelector((state) => state.appUI.modalInfo);
  const dispatch = useDispatch();

  const hideModal = () => dispatch(setModalInfo({ modalInfo: { type: null, channel: null } }));

  return (
    <>
      <Row className="h-100">
        <Col xs lg="3" className="border-right">
          <div className="d-flex mb-2">
            <span>{i18n.t('channelsListTitle')}</span>
            <Button
              className="ml-auto p-0"
              size="sm"
              variant="link"
              onClick={() => dispatch(setModalInfo({ modalInfo: { type: 'adding', channel: null } }))}
            >
              <BsPlusCircle />
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

export default App;
