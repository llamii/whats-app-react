import { useEffect } from 'react';
import { Chat } from './components/Chat';
import { User } from './types/user';

const user: User = {
  idInstance: null,
  apiTokenInstance: null,
};

export const App = () => {
  useEffect(() => {
    user.idInstance = localStorage.getItem('id');
    user.apiTokenInstance = localStorage.getItem('token');
  }, []);

  return (
    <>
      <div className="header">
        <h2>Whats App React</h2>
        <div className="user-info">
          <span className="user-info__id">IdInstance: {localStorage.getItem('id')}</span>
          <span className="user-info__api">ApiTokenInstance: {localStorage.getItem('token')}</span>
        </div>
      </div>
      <Chat user={user} />
    </>
  );
};
