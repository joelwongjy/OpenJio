import { PersonData } from "interfaces/models/persons";
import { UserPostData } from "interfaces/models/users";

export default interface AuthContextInterface {
  data: PersonData | null;
  signup(data: UserPostData): Promise<void>;
  login(data: UserPostData): Promise<void>;
  logout(): Promise<void>;
}
