import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'general',
  initialState: {general:{
    internal_client_ID: null,
    client: null,
    conversations: [],
  }},
  reducers: {
    open: (state, action) => {
      state.general.internal_client_ID = (action.payload).internal_client_ID;
    },
    connect: (state, action) => {
      state.general.client = (action.payload).client;
    },
    load_msg: (state, action) => {
      state.general.conversations = (action.payload).conversations;
    },
  },
});

export const { connect, load_msg, open } = generalSlice.actions;

export default generalSlice.reducer;
