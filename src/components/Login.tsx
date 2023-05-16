import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSnackbar } from 'react-simple-snackbar';
import { snackBarOptions } from '../utils/snackBarOptions';

export const Login = () => {
  const [id, setId] = useLocalStorage<string>('id', '');
  const [apiToken, setApiToken] = useLocalStorage<string>('token', '');
  const [openSnackbar] = useSnackbar(snackBarOptions);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = `https://api.green-api.com/waInstance${id}/GetSettings/${apiToken}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setId(id);
        setApiToken(apiToken);
        navigate('/chats');
      }
    } catch (error) {
      openSnackbar('Произошла ошибка!');
    }
  };

  return (
    <div className="login">
      <div className="login__header">
        <h1>Login</h1>
      </div>
      <form className="login__main" onSubmit={handleSubmit}>
        <h3>ID:</h3>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <h3>API Token:</h3>
        <input type="text" value={apiToken} onChange={(e) => setApiToken(e.target.value)} />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
