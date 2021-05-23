import axios, { AxiosTransformer } from "axios";
import humps from "humps";

import tokenUtils from "utils/tokenUtils";

const ApiService = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API}/${process.env.REACT_APP_BACKEND_VERSION}`,
  headers: { "Content-Type": "application/json" },
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    (data) => humps.camelizeKeys(data), // takes care of case issues
  ],
  // transformRequest: [
  //   (data) => humps.decamelizeKeys(data), // takes care of case issues
  //   ...axios.defaults.transformRequest,
  // ],
});

ApiService.interceptors.request.use(
  (config) => {
    const token = tokenUtils.getToken();
    // eslint-disable-next-line no-param-reassign
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

export default ApiService;
