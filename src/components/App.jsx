import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';


export const App = () => {
  const [state, setState] = useState({
    contacts: [],
    filter: '',
  });

  function contactsLocalStorage(contact) {
    localStorage.setItem('contacts', JSON.stringify(contact));
  }

  useEffect(() => {
    const contactsSave = JSON.parse(localStorage.getItem('contacts'));
    if (contactsSave) {
      setState(prevState => ({
        ...prevState,
        contacts: [...contactsSave]
      }))
    }
  }, [])


  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      name: state.name,
      number: state.number,
      id: nanoid(),
    };
    if (state.contacts.find(contact => contact.name === newContact.name)) {
      alert(`${state.name} is already in contacts`);
      return;
    }
    if (state.contacts.find(contact => contact.number === newContact.number)) {
      alert(`${state.number} is already in contacts`);
      return;
    }
    contactsLocalStorage([...state.contacts, newContact]);
    setState(prevState => ({
      ...prevState,
      contacts: [...state.contacts, newContact]
    }));
    e.target.reset();
  };

  const handleRemoveContact = id => {
    const filteredContacts = state.contacts.filter(
      contact => contact.id !== id
    );
    contactsLocalStorage(filteredContacts);
    setState(prevState => ({
      ...prevState,
      contacts: filteredContacts
    }));
  };

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmit} onChange={handleChange} />
        <h2>Contacts</h2>
        {state.contacts.length > 1 && <Filter onChange={handleChange} />}
        {state.contacts.length > 0 ? (
          <ContactList
            contacts={state.contacts}
            filter={state.filter}
            onRemoveContact={handleRemoveContact}
          />
        ) : (
          <p>Your phonebook is empty.</p>
        )}
      </div>
    );
  }
