import { DiscardableData } from "./base";

export enum DefaultUserRole {
  ADMIN = "Admin",
  USER = "User",
}

export enum StudentMode {
  EDIT = "EDIT",
  NEW = "NEW",
}

export interface UserPostData {
  username: string;
  password: string | null;
}

export interface UserPatchData {
  username: string;
  name: string;
}

export interface UserListData extends DiscardableData {
  username: string;
  name: string;
  appRole: DefaultUserRole;
}

export type UserData = UserListData;
