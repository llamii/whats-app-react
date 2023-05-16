import { FC, useState } from 'react';
import { Contact } from '../types/contact';
import { ContactCell } from './ContactCell';
import { NewUserButton } from './NewUserButton';
import { NewUserModal } from './NewUserModal';

interface IContactListProps {
  contacts: Contact[];
  currentChat: number;
  setContacts: (value: Contact[]) => void;
  setCurrentChat: (value: number) => void;
}

export const ContactList: FC<IContactListProps> = (props) => {
  const { contacts, currentChat, setContacts, setCurrentChat } = props;
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

  const handleOpenNewUserModal = () => {
    setIsNewUserModalOpen(true);
  };

  const handleCloseNewUserModal = () => {
    setIsNewUserModalOpen(false);
  };

  const addContact = (contact: Contact) => {
    if (contact) {
      setContacts([...contacts, contact]);
    } else {
      setContacts([contact]);
    }
  };

  return (
    <>
      <NewUserButton onClick={handleOpenNewUserModal} />
      {contacts?.map((contact) => {
        return (
          <ContactCell
            id={contact.id}
            key={contact.id}
            name={contact.name}
            telephone={contact.telephone}
            lastMessage={contact.lastMessage}
            isCurrent={currentChat === contact.id}
            onClick={() => setCurrentChat(contact.id)}
          />
        );
      })}
      {isNewUserModalOpen && (
        <NewUserModal
          onClose={handleCloseNewUserModal}
          addContact={addContact}
          contactsLength={contacts ? contacts.length : 0}
        />
      )}
    </>
  );
};
