import { combineReducers, createStore, ReducersMapObject } from 'redux';
import { messagesReducer, MessagesState } from '../chat-panel';
import { usersReducer, UsersState } from '../user-selection';

export type AppState = {
  users: UsersState;
  messages: MessagesState;
};

const rootReducer: ReducersMapObject<AppState> = {
  users: usersReducer,
  messages: messagesReducer,
};

export function configureStore(preloadedState?: Partial<AppState>) {
  return createStore(combineReducers(rootReducer), preloadedState);
}
