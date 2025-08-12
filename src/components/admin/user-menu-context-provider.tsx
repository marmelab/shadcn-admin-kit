import { ReactNode } from "react";
import {
  UserMenuContext,
  UserMenuContextValue,
} from "@/hooks/user-menu-context.tsx";

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
