import { Middleware } from 'redux';
import { AppState } from '../../redux';
import { createPersistenceService } from '../../services';
import { User } from '../User';
import {
  ADD_USER,
  AddUserAction,
  GET_USERS,
  REMOVE_USER,
  RemoveUserAction,
  setUsers,
} from './usersActions';

const userPersistenceService = createPersistenceService<User>('users');

export const usersMiddleware: Middleware<{}, AppState> = api => next => action => {
  switch (action.type) {
    case GET_USERS:
      userPersistenceService.getAll().then(users => api.dispatch(setUsers(users)));
      break;
    case ADD_USER:
      const addUserAction = action as AddUserAction;
      userPersistenceService.save(addUserAction.payload!);
      break;
    case REMOVE_USER:
      const removeUserAction = action as RemoveUserAction;
      userPersistenceService.remove(removeUserAction.payload!);
      break;
  }

  next(action);
};
