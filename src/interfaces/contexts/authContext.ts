import { PersonData } from 'interfaces/models/persons';
import {
  UserLoginData,
  UserPatchData,
  UserPostData,
} from 'interfaces/models/users';

export default interface AuthContextInterface {
  data: PersonData | null;
  signup(data: UserPostData): Promise<void>;
  login(data: UserLoginData): Promise<void>;
  update(data: UserPatchData): Promise<void>;
  logout(): Promise<void>;
}
