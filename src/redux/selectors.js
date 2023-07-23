export const getContact = state => state.contact;
export const getContactFilter = state => state.filter;

export const contactsStorage = state => {
  const filter = state.filter.toLowerCase();
  return state.contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
};
