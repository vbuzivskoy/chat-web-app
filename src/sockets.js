import { addChannel, updateChannel, removeChannel } from './reducers/channels';
import { addMessage } from './reducers/messages';

export default (socket, store) => {
  socket.on('newMessage', ({ data: { attributes: message } }) => {
    store.dispatch(addMessage({ message }));
  });

  socket.on('newChannel', ({ data: { attributes: channel } }) => {
    store.dispatch(addChannel({ channel }));
  });

  socket.on('renameChannel', ({ data: { attributes: channel } }) => {
    store.dispatch(updateChannel({ channel }));
  });

  socket.on('removeChannel', ({ data: { id } }) => {
    console.log('removeChannel', id);
    store.dispatch(removeChannel({ id }));
  });
};
