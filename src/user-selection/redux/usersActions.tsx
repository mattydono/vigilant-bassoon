import { createAction } from 'redux-actions';
import { User, UserId } from '../User';

export const GET_USERS = 'users/GET_USERS';
export const getUsers = createAction(GET_USERS);

export const SET_USERS = 'users/SET_USERS';
export const setUsers = createAction<User[]>(SET_USERS);
export type SetUsersAction = ReturnType<typeof setUsers>;

export const ADD_USER = 'users/ADD_USER';
export const addUser = createAction<User>(ADD_USER);
export type AddUserAction = ReturnType<typeof addUser>;

export const SET_ACTIVE_USER = 'users/SET_ACTIVE_USER';
export const setActiveUser = createAction<UserId | null>(SET_ACTIVE_USER);
export type SetActiveUserAction = ReturnType<typeof setActiveUser>;

export const REMOVE_USER = 'users/REMOVE_USER';
export const removeUser = createAction<UserId>(REMOVE_USER);
export type RemoveUserAction = ReturnType<typeof removeUser>;
