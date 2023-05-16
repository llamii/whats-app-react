import { useState, FC } from 'react';
import { Contact } from '../types/contact';
import { useSnackbar } from 'react-simple-snackbar';
import { snackBarOptions } from '../utils/snackBarOptions';

interface INewUserModalProps {
  addContact: (user: Contact) => void;
  onClose: () => void;
  contactsLength: number;
}

export const NewUserModal: FC<INewUserModalProps> = (props) => {
  const { addContact, onClose, contactsLength } = props;

  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [nameError, setNameError] = useState('');
  const [telephoneError, setTelephoneError] = useState('');
  const [openSnackbar] = useSnackbar(snackBarOptions);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    // Проверка валидности имени
    if (!/^[a-zA-Zа-яА-Я]{2,16}$/.test(value)) {
      setNameError('Имя должно содержать от 2 до 16 букв');
    } else {
      setNameError('');
    }
  };

  const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTelephone(value);
    // Проверка валидности номера телефона
    if (!/^\d{11}$/.test(value)) {
      setTelephoneError('Номер телефона должен быть в формате xxxxxxxxxxx');
    } else {
      setTelephoneError('');
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!name || !telephone || nameError || telephoneError) {
      openSnackbar('Проверьте правильность данных');
      return;
    }

    const newUser: Contact = {
      id: contactsLength,
      name: name,
      telephone: telephone,
      lastMessage: '',
      messages: [],
    };

    addContact(newUser);

    onClose();
    setName('');
    setTelephone('');
    setNameError('');
    setTelephoneError('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            className="modal-input"
            placeholder="Введите имя контакта"
          />
          {nameError && <div className="error">{nameError}</div>}
          <input
            value={telephone}
            onChange={handleTelephoneChange}
            type="text"
            className="modal-input"
            placeholder="Введите номер телефона"
          />
          {telephoneError && <div className="error">{telephoneError}</div>}
        </div>
        <div className="modal-footer">
          <button className="modal-add-button" onClick={handleSubmit}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};
