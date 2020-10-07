import { createSlice } from '@reduxjs/toolkit';

const appUISlice = createSlice({
  name: 'appUI',
  initialState: {
    modalInfo: {
      type: null,
      channel: null,
    },
  },
  reducers: {
    setModalInfo(state, action) {
      state.modalInfo = action.payload.modalInfo;
    },
  },
});

export const { setModalInfo } = appUISlice.actions;

export default appUISlice.reducer;
