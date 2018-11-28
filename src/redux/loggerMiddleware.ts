import { Middleware } from 'redux';
import { AppState } from './configureStore';

export const logger: Middleware<{}, AppState> = store => next => action => {
  console.log('dispatching...', action);
  const result = next(action);
  console.log('Current state', store.getState());
  return result;
};
