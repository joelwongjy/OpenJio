import { AxiosResponse } from 'axios';

import LoginData from 'interfaces/models/auth';

export const ACCESS_TOKEN_KEY = 'accessToken';

const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

const storeToken = (response: AxiosResponse<LoginData>): Promise<null> => {
  if (response.status === 200 || response.status === 201) {
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data[ACCESS_TOKEN_KEY]);
    return Promise.resolve(null);
  }
  return Promise.reject(new Error(response.statusText));
};

const removeToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getToken: getAccessToken, storeToken, removeToken };
