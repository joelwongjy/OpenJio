import { ACCESS_TOKEN_KEY } from 'utils/tokenUtils';

export default interface LoginData {
  [ACCESS_TOKEN_KEY]: string;
}
