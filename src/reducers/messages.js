import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channels';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      console.log(action);
      const { message } = action.payload;
      const existedMessage = state.find(({ id }) => message.id === id);
      if (!existedMessage) {
        state.push(message);
      }
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
