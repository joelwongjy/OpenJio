import { DiscardableData } from './base';
import { UserData } from './users';

/* ==================
  TYPES FROM BACKEND
 ================== */

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export interface PersonPostData {
  name: string;
  gender: string;
  mobileNumber?: string;
  email?: string;
}

export interface PersonListData extends DiscardableData {
  name: string;
  mobileNumber?: string;
}

export interface PersonData extends PersonListData {
  // imageUrl: string // not in backend yet
  birthday?: Date | string;
  gender: Gender;
  mobileNumber?: string;
  homeNumber?: string;
  email?: string;
  user?: UserData;
}
