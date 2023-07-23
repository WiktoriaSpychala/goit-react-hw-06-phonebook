import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { contactsStorage } from '../../redux/selectors';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(contactsStorage);
  const dispatch = useDispatch();

  const checkContactExist = (name, number) => {
    return (
      contacts &&
      contacts.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number === number
      )
    );
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newContact = { id: nanoid(), name, number };

    if (checkContactExist(name, number)) {
      alert(
        `${name} is already in contacts or number: ${number} is used with another contact`
      );
      handleReset();
      return;
    }
    dispatch(addContact(newContact));
    handleReset();
  };

  const handleReset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <h2 className={css.name}>Name</h2>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label>
          <h2 className={css.number}>Number</h2>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
        </label>

        <button type="submit" className={css.addContactBtn}>
          Add contact
        </button>
      </form>
    </>
  );
}
