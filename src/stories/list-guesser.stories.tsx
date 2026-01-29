import { Resource, TestMemoryRouter } from "ra-core";
import fakeRestProvider from "ra-data-fakerest";
import { Admin, ListGuesser, ShowGuesser } from "@/components/admin";
import { i18nProvider } from "@/lib/i18nProvider";

export default {
  title: "List/ListGuesser",
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};

const data = {
  products: [
    {
      id: 1,
      name: "Office jeans",
      price: 45.99,
      category_id: 1,
      tags_ids: [1],
      last_update: new Date("2023-10-01").toISOString(),
      email: "office.jeans@myshop.com",
    },
    {
      id: 2,
      name: "Black elegance jeans",
      price: 69.99,
      category_id: 1,
      tags_ids: [2, 3],
      last_update: new Date("2023-11-01").toISOString(),
      email: "black.elegance.jeans@myshop.com",
    },
    {
      id: 3,
      name: "Slim fit jeans",
      price: 55.99,
      category_id: 1,
      tags_ids: [2, 4],
      last_update: new Date("2023-12-01").toISOString(),
      email: "slim.fit.jeans@myshop.com",
    },
    {
      id: 4,
      name: "Basic T-shirt",
      price: 15.99,
      category_id: 2,
      tags_ids: [1, 4, 3],
      last_update: new Date("2023-10-15").toISOString(),
      email: "basic.t.shirt@myshop.com",
    },
    {
      id: 5,
      name: "Basic cap",
      price: 19.99,
      category_id: 6,
      tags_ids: [1, 4, 3],
      last_update: new Date("2023-10-15").toISOString(),
      email: "basic.cap@myshop.com",
    },
  ],
  categories: [
    {
      id: 1,
      name: "Jeans",
      alternativeName: [{ name: "denims" }, { name: "pants" }],
      isVeganProduction: true,
    },
    {
      id: 2,
      name: "T-Shirts",
      alternativeName: [{ name: "polo" }, { name: "tee shirt" }],
      isVeganProduction: false,
    },
    {
      id: 3,
      name: "Jackets",
      alternativeName: [{ name: "coat" }, { name: "blazers" }],
      isVeganProduction: false,
    },
    {
      id: 4,
      name: "Shoes",
      alternativeName: [{ name: "sneakers" }, { name: "moccasins" }],
      isVeganProduction: false,
    },
    {
      id: 5,
      name: "Accessories",
      alternativeName: [{ name: "jewelry" }, { name: "belts" }],
      isVeganProduction: true,
    },
    {
      id: 6,
      name: "Hats",
      alternativeName: [{ name: "caps" }, { name: "headwear" }],
      isVeganProduction: true,
    },
    {
      id: 7,
      name: "Socks",
      alternativeName: [{ name: "stockings" }, { name: "hosiery" }],
      isVeganProduction: false,
    },
    {
      id: 8,
      name: "Bags",
      alternativeName: [{ name: "handbags" }, { name: "purses" }],
      isVeganProduction: false,
    },
    {
      id: 9,
      name: "Dresses",
      alternativeName: [{ name: "robes" }, { name: "gowns" }],
      isVeganProduction: false,
    },
    {
      id: 10,
      name: "Skirts",
      alternativeName: [{ name: "tutus" }, { name: "kilts" }],
      isVeganProduction: false,
    },
  ],
  tags: [
    {
      id: 1,
      name: "top seller",
      url: "https://www.myshop.com/tags/top-seller",
    },
    {
      id: 2,
      name: "new",
      url: "https://www.myshop.com/tags/new",
    },
    {
      id: 3,
      name: "sale",
      url: "https://www.myshop.com/tags/sale",
    },
    {
      id: 4,
      name: "promotion",
      url: "https://www.myshop.com/tags/promotion",
    },
  ],
};

const dataProvider = fakeRestProvider(data, process.env.NODE_ENV !== "test");

const emptyDataProvider = fakeRestProvider(
  { products: [] },
  process.env.NODE_ENV !== "test",
);

const EmptyCreate = () => null;

export const Basic = () => (
  <TestMemoryRouter initialEntries={["/products"]}>
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <Resource
        name="products"
        list={ListGuesser}
        recordRepresentation="name"
      />
      <Resource name="categories" recordRepresentation="name" />
      <Resource name="tags" recordRepresentation="name" />
    </Admin>
  </TestMemoryRouter>
);

export const Empty = () => (
  <TestMemoryRouter initialEntries={["/products"]}>
    <Admin dataProvider={emptyDataProvider} i18nProvider={i18nProvider}>
      <Resource
        name="products"
        list={ListGuesser}
        create={EmptyCreate}
        recordRepresentation="name"
      />
    </Admin>
  </TestMemoryRouter>
);

export const LinkedShow = () => (
  <TestMemoryRouter initialEntries={["/products"]}>
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <Resource
        name="products"
        list={ListGuesser}
        show={ShowGuesser}
        recordRepresentation="name"
      />
      <Resource name="categories" recordRepresentation="name" />
      <Resource name="tags" recordRepresentation="name" />
    </Admin>
  </TestMemoryRouter>
);

const delayedDataProvider = fakeRestProvider(
  data,
  process.env.NODE_ENV !== "test",
  300,
);

export const ManyResources = () => (
  <TestMemoryRouter initialEntries={["/products"]}>
    <Admin dataProvider={delayedDataProvider} i18nProvider={i18nProvider}>
      <Resource
        name="products"
        list={ListGuesser}
        recordRepresentation="name"
      />
      <Resource
        name="categories"
        list={ListGuesser}
        recordRepresentation="name"
      />
      <Resource name="tags" list={ListGuesser} recordRepresentation="name" />
    </Admin>
  </TestMemoryRouter>
);
