import {Action} from "./Action";
import {Message} from "../models";

export const ADD_MESSAGE = 'messages/ADD_MESSAGE';
export const addMessage = (payload: Message): Action<Message, never> => ({
    type: ADD_MESSAGE,
    payload,
});
export type MessageAction = ReturnType<typeof addMessage>;
