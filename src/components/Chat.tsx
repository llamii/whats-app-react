import { FC, useEffect, useState } from 'react';

import { Contact } from '../types/contact';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { User } from '../types/user';
import { ContactList } from './ContactList';
import { ChatBox } from './ChatBox';

interface IChatProps {
  user: User;
}

export const Chat: FC<IChatProps> = (props) => {
  const { user } = props;
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', []);
  const [currentChat, setCurrentChat] = useState(0);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="chat">
      <div className="chat__left">
        <ContactList
          contacts={contacts}
          currentChat={currentChat}
          setContacts={setContacts}
          setCurrentChat={setCurrentChat}
        />
      </div>
      <div className="chat__right">
        <ChatBox
          contacts={contacts}
          currentChat={currentChat}
          setContacts={setContacts}
          user={user}
        />
      </div>
    </div>
  );
};
