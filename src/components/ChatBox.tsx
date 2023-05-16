import { FC, useState, useEffect } from 'react';
import { Contact } from '../types/contact';
import sendMessage from '../api/sendMessage';
import { User } from '../types/user';
import receiveNotification from '../api/receiveNotification';
import deleteNotification from '../api/deleteNotification';

interface IChatBoxProps {
  user: User;
  contacts: Contact[];
  currentChat: number;
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export const ChatBox: FC<IChatBoxProps> = (props) => {
  const { user, contacts, currentChat, setContacts } = props;
  const [message, setMessage] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (contacts && contacts[currentChat]) {
      const chatId = contacts[currentChat].telephone.toString() + `@c.us`;
      sendMessage(chatId, message, user);
      const newMessage = {
        text: message,
        received: false,
      };

      const updatedContacts = contacts.map((contact) => {
        if (contact.id === currentChat) {
          const updatedMessages = contact.messages
            ? [...contact.messages, newMessage]
            : [newMessage];
          return {
            ...contact,
            messages: updatedMessages,
          };
        }
        return contact;
      });

      setContacts(updatedContacts);
      setMessage('');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      receiveNotification(user).then((responseData) => {
        if (responseData !== null) {
          const receiptId = responseData.receiptId;
          deleteNotification(receiptId, user);

          const sender = responseData.body?.senderData?.sender.split('@')[0];
          const textMessage = responseData.body?.messageData?.textMessageData?.textMessage;

          const newMessage = {
            text: textMessage,
            received: true,
          };

          const updatedContacts = contacts.map((contact) => {
            if (contact.telephone === sender) {
              const updatedMessages = contact.messages
                ? [...contact.messages, newMessage]
                : [newMessage];
              return {
                ...contact,
                messages: updatedMessages,
              };
            }
            return contact;
          });

          setContacts(updatedContacts);
        }
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [user, contacts, setContacts]);
  return (
    <>
      <div className="chat__right--header">
        <span>{contacts ? contacts[currentChat]?.name : null}</span>
        <span className="chat__right--header__telephone">
          {contacts ? contacts[currentChat]?.telephone : null}
        </span>
      </div>
      <div className="chat__right--main">
        {contacts && contacts[currentChat] && contacts[currentChat]?.messages ? (
          <div className="chat-box can-select">
            {contacts[currentChat]?.messages?.map((message, index) => (
              <div key={index} className={`message ${message.received ? 'received' : 'sent'}`}>
                {message.text && <div className="text">{message.text}</div>}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {contacts && (
        <div className="chat__right--footer">
          <textarea
            placeholder="Напишите сообщение..."
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
            value={message}></textarea>
          <button onClick={handleSendMessage}>Отправить</button>
        </div>
      )}
    </>
  );
};
