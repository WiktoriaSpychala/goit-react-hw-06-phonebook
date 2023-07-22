import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import React from 'react';

export class ContactList extends React.Component {
  render() {
    const { contacts, filter, onRemoveContact } = this.props;
    return (
      <ul>
        {contacts
          .filter(contact =>
            contact.name
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          )
          .map(contact => (
            <li className={css.list__contact} key={contact.id}>
              <span className={css.name}>{contact.name}</span>
              :
              <span className={css.number}>{contact.number}</span>
              <button
                type="Button"
                onClick={() => onRemoveContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    );
  }
}
ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};
