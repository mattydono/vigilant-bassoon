import { createAction } from '../../redux';
import { Message } from '../Message';

export const ADD_MESSAGE = 'messages/ADD_MESSAGE';
export const addMessage = createAction<Message>(ADD_MESSAGE);
export type AddMessageAction = ReturnType<typeof addMessage>;
