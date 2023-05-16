import React, { FC } from 'react';
import clsx from 'clsx';

interface IContactCellProps {
  id: number;
  name: string;
  telephone: string;
  lastMessage?: string;
  isCurrent?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const ContactCell: FC<IContactCellProps> = (props) => {
  const { name, isCurrent, onClick } = props;

  return (
    <div className={clsx('contact', isCurrent ? 'current' : '')} onClick={onClick}>
      <span className="contact__name">{name}</span>
    </div>
  );
};

