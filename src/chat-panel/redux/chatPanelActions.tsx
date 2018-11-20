import { createAction } from 'redux-actions';
import { Message, MessageId } from '../Message';

export const ADD_MESSAGE = 'messages/ADD_MESSAGE';
export const addMessage = createAction<Message>(ADD_MESSAGE);
export type AddMessageAction = ReturnType<typeof addMessage>;

export const REMOVE_MESSAGE = 'messages/REMOVE_MESSAGE';
export const removeMessage = createAction<MessageId>(REMOVE_MESSAGE);
export type RemoveMessageAction = ReturnType<typeof removeMessage>;
