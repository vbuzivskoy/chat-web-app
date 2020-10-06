import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channels';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      const { message } = action.payload;
      state.push(message);
    },
  },
  extraReducers: {
    [removeChannel]: (state, action) => {
      const { id } = action.payload;
      return state.filter(({ channelId }) => channelId !== id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
