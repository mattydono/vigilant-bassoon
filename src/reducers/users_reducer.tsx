import { Action } from '../actiontypes/Action';
import * as UsersActionTypes from '../actiontypes/users_actions';
import { User, UserId } from '../models';

type UsersState = User[];

export function usersReducer(
  state: UsersState = [],
  action: AddUserAction | RemoveUserAction,
): UsersState {
  switch (action.type) {
    case UsersActionTypes.ADD_USER:
      return [...state, (action as AddUserAction).payload];

    case UsersActionTypes.SET_ACTIVE_USER:

    case UsersActionTypes.REMOVE_USER:
      const idX = state.findIndex(user => user.id === action.payload);
      const newState = [...state];
      newState.splice(idX, 1);
      return newState;

    default:
      return state;
  }
}

type AddUserAction = Action<User, never>;

type RemoveUserAction = Action<UserId, never>;
