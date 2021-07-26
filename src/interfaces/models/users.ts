import { DiscardableData } from './base';

export enum DefaultUserRole {
  ADMIN = 'Admin',
  USER = 'User',
}

export enum StudentMode {
  EDIT = 'EDIT',
  NEW = 'NEW',
}

export interface UserPostData {
  name: string;
  username: string;
  email: string;
  password: string | null;
  confirmPassword: string | null;
}
export interface UserLoginData {
  username: string;
  password: string | null;
}

export interface UserPatchData {
  username?: string;
  name?: string;
  paylah?: string;
}

export interface UserListData extends DiscardableData {
  username: string;
  name: string;
  paylah?: string;
  appRole: DefaultUserRole;
}

export type UserData = UserListData;
