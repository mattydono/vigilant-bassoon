import { applyMiddleware, combineReducers, createStore, Dispatch, ReducersMapObject } from 'redux';
import thunkMiddleware from 'redux-thunk';
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

const logger = () => (next: Dispatch) => (action: any) => {
  console.log('action fired', action);
  next(action);
};

const middleware = applyMiddleware(logger, thunkMiddleware);

export function configureStore(preloadedState?: Partial<AppState>) {
  return createStore(combineReducers(rootReducer), preloadedState, middleware);
}
