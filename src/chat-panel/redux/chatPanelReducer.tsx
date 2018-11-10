import { Message } from '../Message';
import * as MessagesActionTypes from './chatPanelActions';
import { AddMessageAction } from './chatPanelActions';

type MessagesState = Message[];

export function messagesReducer(
  state: MessagesState = [],
  action: AddMessageAction,
): MessagesState {
  switch (action.type) {
    case MessagesActionTypes.ADD_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
}
