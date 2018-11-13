import { UserId } from '../user-selection';

export type MessageId = string;

export type Message = {
  userId: UserId;
  id: MessageId;
  message: string;
  time: string;
};
