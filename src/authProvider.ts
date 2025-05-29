import { AuthProvider, HttpError } from "ra-core";
import data from "./users.json";

const DEFAULT_IDENTITY = data.users[0];

/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
  login: ({ email, password }) => {
    const user = data.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userToPersist } = user;
      localStorage.setItem("user", JSON.stringify(userToPersist));
      localStorage.removeItem("not_authenticated");
      return Promise.resolve();
    }

    localStorage.setItem("not_authenticated", "true");
    return Promise.reject(
      new HttpError("Unauthorized", 401, {
        message: "Invalid email or password",
      })
    );
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.setItem("not_authenticated", "true");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    return localStorage.getItem("not_authenticated")
      ? Promise.reject()
      : Promise.resolve();
  },
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : DEFAULT_IDENTITY;

    return Promise.resolve(user);
  },
};
