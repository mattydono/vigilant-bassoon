import { User } from '../User';
import {
  ADD_USER,
  AddUserAction,
  REMOVE_USER,
  RemoveUserAction,
  SET_ACTIVE_USER,
  SetActiveUserAction,
} from './usersActions';

type UsersState = User[];

export function usersReducer(
  state: UsersState = [],
  action: AddUserAction | SetActiveUserAction | RemoveUserAction,
): UsersState {
  switch (action.type) {
    case ADD_USER:
      const addUserAction = action as AddUserAction;
      return [...state, addUserAction.payload];

    case SET_ACTIVE_USER:
      return state;

    case REMOVE_USER:
      const removeUserAction = action as RemoveUserAction;
      const idx = state.findIndex(user => user.id === removeUserAction.payload);
      const newState = [...state];
      newState.splice(idx, 1);
      return newState;

    default:
      return state;
  }
}
