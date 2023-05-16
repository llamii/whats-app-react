import axios from 'axios';
import { User } from '../types/user';

const deleteNotification = async (receiptId: string, user: User) => {
  const id = user?.idInstance?.replace(/"/g, '');
  const api = user?.apiTokenInstance?.replace(/"/g, '');

  const config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `https://api.green-api.com/waInstance${id}/deleteNotification/${api}/${receiptId}`,
    headers: {},
  };

  axios.request(config);
};

export default deleteNotification;
