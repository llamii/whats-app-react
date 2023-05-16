import { FC } from 'react';

interface INewUserButtonProps {
  onClick: () => void;
}

export const NewUserButton: FC<INewUserButtonProps> = (props) => {
  const { onClick } = props;

  return (
    <div className={'contact new'} onClick={onClick}>
      <span className="contact__name">Добавить контакт</span>
    </div>
  );
};
