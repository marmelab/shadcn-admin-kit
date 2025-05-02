import { AuthProvider, HttpError } from "ra-core";
import data from "./users.json";

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
      return Promise.resolve();
    }

    return Promise.reject(
      new HttpError("Unauthorized", 401, {
        message: "Invalid email or password",
      })
    );
  },
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
