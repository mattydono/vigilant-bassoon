import * as MessagesActionTypes from '../actiontypes/messages_actions';
import { MessageAction } from '../actiontypes/messages_actions';
import { Message } from '../models';

type MessagesState = Message[];

export function messagesReducer(state: MessagesState = [], action: MessageAction) {
  switch (action.type) {
    case MessagesActionTypes.ADD_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
}
