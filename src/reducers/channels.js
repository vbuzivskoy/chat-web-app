import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    chatChannels: [],
    currentChannelId: defaultChannelId,
  },
  reducers: {
    addChannel(state, action) {
      const { channel } = action.payload;
      state.chatChannels.push(channel);
    },
    updateChannel(state, action) {
      const { channel } = action.payload;
      const channelToBeEditedIndex = state.chatChannels.findIndex(({ id }) => id === channel.id);
      state.chatChannels[channelToBeEditedIndex] = channel;
    },
    removeChannel(state, action) {
      const { id: toBeRemoveChannelId } = action.payload;
      state.chatChannels = state.chatChannels.filter(({ id }) => id !== toBeRemoveChannelId);
      state.currentChannelId = state.currentChannelId === toBeRemoveChannelId
        ? defaultChannelId
        : state.currentChannelId;
    },
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload.currentChannelId;
    },
  },
});

export const {
  addChannel,
  removeChannel,
  updateChannel,
  setCurrentChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
