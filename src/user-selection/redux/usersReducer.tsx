import { User, UserId } from '../User';
import {
  ADD_USER,
  AddUserAction,
  REMOVE_USER,
  RemoveUserAction,
  SET_ACTIVE_USER,
  SetActiveUserAction,
} from './usersActions';

export type UsersState = {
  users: User[];
  activeUserId: UserId | null;
};

const initialState: UsersState = {
  users: [],
  activeUserId: null,
};

export function usersReducer(
  state: UsersState = initialState,
  action: AddUserAction | SetActiveUserAction | RemoveUserAction,
): UsersState {
  switch (action.type) {
    case ADD_USER:
      const addUserAction = action as AddUserAction;
      return { ...state, users: [...state.users, addUserAction.payload!] };

    case SET_ACTIVE_USER:
      const setActiveUserAction = action as SetActiveUserAction;
      return { ...state, activeUserId: setActiveUserAction.payload! };

    case REMOVE_USER:
      const removeUserAction = action as RemoveUserAction;
      const idx = state.users.findIndex(user => user.id === removeUserAction.payload);
      const newUsers = [...state.users];
      newUsers.splice(idx, 1);
      return { ...state, users: newUsers };

    default:
      return state;
  }
}
