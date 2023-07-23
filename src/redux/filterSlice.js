import { createSlice } from '@reduxjs/toolkit';

const initialStateUser = {
  contacts: [],
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialStateUser.filter,
  reducers: {
    setFilter(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
