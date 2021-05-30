import { PersonData } from "interfaces/models/persons";
import { UserLoginData, UserPostData } from "interfaces/models/users";

export default interface AuthContextInterface {
  data: PersonData | null;
  signup(data: UserPostData): Promise<void>;
  login(data: UserLoginData): Promise<void>;
  logout(): Promise<void>;
}
