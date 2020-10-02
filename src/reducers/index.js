import { channelsReducer, currentChannelIdReducer } from './channels';
import messagesReducer from './messages';
import appUIReducer from './appUI';

export default {
  channels: channelsReducer,
  currentChannelId: currentChannelIdReducer,
  messages: messagesReducer,
  appUI: appUIReducer,
};
