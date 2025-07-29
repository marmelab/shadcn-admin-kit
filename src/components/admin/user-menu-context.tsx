/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from "react";

export type UserMenuContextValue = {
  /**
   * Closes the user menu
   * @see UserMenu
   */
  onClose: () => void;
};

export const UserMenuContext = createContext<UserMenuContextValue | undefined>(
  undefined
);

export type UserMenuContextProviderProps = {
  children: ReactNode;
  value: UserMenuContextValue;
};

export const UserMenuContextProvider = ({
  children,
  value,
}: UserMenuContextProviderProps) => (
  <UserMenuContext.Provider value={value}>{children}</UserMenuContext.Provider>
);

export const useUserMenu = () => useContext(UserMenuContext);
