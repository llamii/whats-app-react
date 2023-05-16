import axios from 'axios';
import { User } from '../types/user';

const getSettings = async (user: User) => {
  const id = user?.idInstance?.replace(/"/g, '');
  const api = user?.apiTokenInstance?.replace(/"/g, '');

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.green-api.com/waInstance${id}/GetSettings/${api}`,
    headers: {},
  };

  const response = await axios.request(config);
  return response.data;
};

export default getSettings;
