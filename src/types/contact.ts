import { Message } from './message';

export type Contact = {
  id: number;
  name: string;
  telephone: string;
  lastMessage?: string;
  messages?: Message[];
};
