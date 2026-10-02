import type { AuthProvider } from "ra-core";
import { Resource, TestMemoryRouter } from "ra-core";
import fakeRestProvider from "ra-data-fakerest";
import { Admin, ListGuesser } from "@/components/admin";

export default {
  title: "Layout/AccessDenied",
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};

const dataProvider = fakeRestProvider(
  {
    products: [
      { id: 1, name: "Office jeans", price: 45.99 },
      { id: 2, name: "Basic T-shirt", price: 15.99 },
    ],
  },
  process.env.NODE_ENV !== "test",
);

const authProvider: AuthProvider = {
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
  canAccess: ({ resource, action }) =>
    Promise.resolve(resource == "products" && action === "list" ? false : true),
};

export const Basic = () => (
  <TestMemoryRouter initialEntries={["/products"]}>
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="products" list={ListGuesser} />
    </Admin>
  </TestMemoryRouter>
);
