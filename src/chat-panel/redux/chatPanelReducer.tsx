import { Message } from '../Message';
import {
  ADD_MESSAGE,
  AddMessageAction,
  REMOVE_MESSAGE,
  RemoveMessageAction,
} from './chatPanelActions';

export type MessagesState = {
  messages: Message[];
};

const initialState: MessagesState = {
  messages: [],
};

export function messagesReducer(
  state: MessagesState = initialState,
  action: AddMessageAction | RemoveMessageAction,
): MessagesState {
  switch (action.type) {
    case ADD_MESSAGE:
      const addMessageAction = action as AddMessageAction;
      return { ...state, messages: [...state.messages, addMessageAction.payload!] };

    case REMOVE_MESSAGE:
      const removeMessageAction = action as RemoveMessageAction;
      const idx = state.messages.findIndex(message => message.id === removeMessageAction.payload);
      const newMessages = [...state.messages];
      newMessages.splice(idx, 1);
      return { ...state, messages: newMessages };

    default:
      return state;
  }
}
