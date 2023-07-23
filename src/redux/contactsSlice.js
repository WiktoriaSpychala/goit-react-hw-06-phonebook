import { createSlice } from '@reduxjs/toolkit';

const initialStateUser = {
  contacts: [],
  filter: '',
};

const contactSlice = createSlice({
  name: 'contact',
  initialState: initialStateUser.contacts,
  reducers: {
    addContact(state, { payload }) {
      state.push(payload);
    },
    deleteContact: (store, { payload }) =>
      store.filter(item => item.id !== payload),
  },
});

export const { addContact, deleteContact } = contactSlice.actions;
export const ContactReducer = contactSlice.reducer;
