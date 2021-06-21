/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PersonData } from 'interfaces/models/persons';

export interface MiscDux {
  user?: PersonData;
  lastRetrieved?: number;
}

const initialState: MiscDux = {};

// Contains user information, theme, view selected and fun fact of the day
const misc = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<PersonData>): void => {
      state.user = { ...action.payload };
      state.lastRetrieved = Date.now();
    },
    clearUser: (state): void => {
      state.user = undefined;
      state.lastRetrieved = undefined;
    },
  },
});

export const { setUser, clearUser } = misc.actions;

export default misc.reducer;
