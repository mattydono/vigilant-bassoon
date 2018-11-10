import { Message } from '../models';
import { Action } from './Action';

export const ADD_MESSAGE = 'messages/ADD_MESSAGE';
export const addMessage = (payload: Message): Action<Message, never> => ({
  type: ADD_MESSAGE,
  payload,
});
export type MessageAction = ReturnType<typeof addMessage>;
