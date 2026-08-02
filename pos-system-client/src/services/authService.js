import { loginApi, signupApi , registerStoreApi} from "../api/authApi";

export const loginService = async (credentials) => {
  return await loginApi(credentials);
};

export const signupService = async (userData) => {
  return await signupApi(userData);
};

export const registerStoreService = async (data) => {
  return await registerStoreApi(data);
};