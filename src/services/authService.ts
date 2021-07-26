import store from 'app/store';
import { GENERAL_ERROR } from 'constants/messages';
import { PersonData } from 'interfaces/models/persons';
import {
  UserLoginData,
  UserPatchData,
  UserPostData,
} from 'interfaces/models/users';
import { clearUser, setUser } from 'reducers/miscDux';
import ApiService from 'services/apiService';
import TokenUtils from 'utils/tokenUtils';

const logout = (): Promise<void> => {
  TokenUtils.removeToken();
  store.dispatch(clearUser());
  return Promise.resolve();
};

const signup = async (data: UserPostData): Promise<null> => {
  const response = await ApiService.post('users', data).catch((error) => {
    return Promise.reject(
      new Error(error.response?.data?.error ?? GENERAL_ERROR)
    );
  });
  return TokenUtils.storeToken(response);
};

const login = async (data: UserLoginData): Promise<null> => {
  const response = await ApiService.post('auth/login', data).catch((error) => {
    return Promise.reject(
      new Error(error.response?.data?.error ?? GENERAL_ERROR)
    );
  });
  return TokenUtils.storeToken(response);
};

const update = async (data: UserPatchData): Promise<null> => {
  await ApiService.patch('users/self', data).catch((error) => {
    return Promise.reject(
      new Error(error.response?.data?.error ?? GENERAL_ERROR)
    );
  });
  return Promise.resolve(null);
};

const getUser = async (): Promise<PersonData | null> => {
  const token = TokenUtils.getToken();
  if (!token) {
    return Promise.resolve(null);
  }

  try {
    const response = await ApiService.get('users/self');
    if (response.status === 200) {
      const { user } = response.data;
      store.dispatch(setUser(user));
      return user;
    }
    throw new Error(response.statusText);
  } catch (error) {
    logout();
    return Promise.reject(new Error(error));
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signup,
  login,
  update,
  logout,
  getUser,
};
