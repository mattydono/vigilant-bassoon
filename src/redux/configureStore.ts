import {
  applyMiddleware,
  combineReducers,
  createStore,
  DeepPartial,
  ReducersMapObject,
} from 'redux';
import { messagesReducer, MessagesState } from '../chat-panel';
import { usersMiddleware, usersReducer, UsersState } from '../user-selection';
import { logger } from './loggerMiddleware';

export type AppState = {
  users: UsersState;
  messages: MessagesState;
};

const rootReducer: ReducersMapObject<AppState> = {
  users: usersReducer,
  messages: messagesReducer,
};

const middleware = [logger, usersMiddleware];

export function configureStore(preloadedState?: DeepPartial<AppState>) {
  return createStore(combineReducers(rootReducer), preloadedState, applyMiddleware(...middleware));
}
