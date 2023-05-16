import axios from 'axios';
import { User } from '../types/user';

const sendMessage = async (chatId: string, message: string, user: User) => {
  const id = user?.idInstance?.replace(/"/g, '');
  const api = user?.apiTokenInstance?.replace(/"/g, '');
  const data = JSON.stringify({
    chatId,
    message,
  });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://api.green-api.com/waInstance${id}/sendMessage/${api}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      return JSON.stringify(response.data);
    })
    .catch((error) => {
      return error;
    });
};

export default sendMessage;
