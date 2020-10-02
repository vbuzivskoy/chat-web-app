import { createSlice } from '@reduxjs/toolkit';

const appUISlice = createSlice({
  name: 'appUI',
  initialState: {
    isAddChannelModalShown: false,
    isRemoveChannelModalShown: false,
    isEditChannelModalShown: false,
    channelToBeRemoved: null,
    channelToBeEdited: null,
  },
  reducers: {
    showAddChannelModal(state) {
      state.isAddChannelModalShown = true;
    },
    hideAddChannelModal(state) {
      state.isAddChannelModalShown = false;
    },
    showRemoveChannelModal(state, action) {
      const { channel } = action.payload;
      state.isRemoveChannelModalShown = true;
      state.channelToBeRemoved = channel;
    },
    hideRemoveChannelModal(state) {
      state.isRemoveChannelModalShown = false;
      state.channelToBeRemoved = null;
    },
    showEditChannelModal(state, action) {
      const { channel } = action.payload;
      state.isEditChannelModalShown = true;
      state.channelToBeEdited = channel;
    },
    hideEditChannelModal(state) {
      state.isEditChannelModalShown = false;
      state.channelToBeEdited = null;
    },
  },
});

export const {
  showAddChannelModal,
  hideAddChannelModal,
  showRemoveChannelModal,
  hideRemoveChannelModal,
  showEditChannelModal,
  hideEditChannelModal,
} = appUISlice.actions;

export default appUISlice.reducer;
