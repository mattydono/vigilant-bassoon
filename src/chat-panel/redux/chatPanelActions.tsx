import { createAction } from 'redux-actions';
import { Message, MessageId } from '../Message';

export const SET_MESSAGES = 'messages/SET_MESSAGES';
export const setMessages = createAction<Message[]>(SET_MESSAGES);

export const ADD_MESSAGE = 'messages/ADD_MESSAGE';
export const addMessage = createAction<Message>(ADD_MESSAGE);
export type AddMessageAction = ReturnType<typeof addMessage>;

export const REMOVE_MESSAGE = 'messages/REMOVE_MESSAGE';
export const removeMessage = createAction<MessageId>(REMOVE_MESSAGE);
export type RemoveMessageAction = ReturnType<typeof removeMessage>;

export const EDIT_MESSAGE = 'messages/EDIT_MESSAGE';
export const editMessage = createAction<Message>(EDIT_MESSAGE);
export type EditMessageAction = ReturnType<typeof editMessage>;
