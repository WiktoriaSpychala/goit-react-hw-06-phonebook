import React from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { contactsStorage } from '../../redux/selectors';

const ContactList = () => {
  const contacts = useSelector(contactsStorage);
  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li className={css.list__contact} key={id}>
          <span className={css.name}>{name}:</span>
          <span className={css.number}>{number}</span>
          <button
            type="button"
            onClick={() => onDeleteContact(id)}
            className={css.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
