import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, action) {
      const { channel } = action.payload;
      const existedChannel = state.find(({ id }) => channel.id === id);
      if (!existedChannel) {
        state.push(channel);
      }
    },
    updateChannel(state, action) {
      const { channel } = action.payload;
      const channelToBeEditedIndex = state.findIndex(({ id }) => id === channel.id);
      state[channelToBeEditedIndex] = channel;
    },
    removeChannel(state, action) {
      const { id: toBeRemoveChannelId } = action.payload;
      return state.filter(({ id }) => id !== toBeRemoveChannelId);
    },
  },
});

export const { addChannel, removeChannel, updateChannel } = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;

const currentChannelId = createSlice({
  name: 'currentChannelId',
  initialState: defaultChannelId,
  reducers: {
    setCurrentChannelId(state, action) {
      return action.payload.currentChannelId;
    },
  },
  extraReducers: {
    [removeChannel]: (state, action) => {
      const { id } = action.payload;
      return state === id ? defaultChannelId : state;
    },
  },
});

export const { setCurrentChannelId } = currentChannelId.actions;
export const currentChannelIdReducer = currentChannelId.reducer;
