const TOKEN_KEY = "pos_token";
const USER_KEY = "pos_user";

export const storage = {
  setToken: (token) => {
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  getToken: () => {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  removeToken: () => {
    sessionStorage.removeItem(TOKEN_KEY);
  },

  setUser: (user) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: () => {
    const user = sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  clear: () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
};