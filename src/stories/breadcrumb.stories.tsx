import { Resource, TestMemoryRouter } from "ra-core";
import fakeRestProvider from "ra-data-fakerest";
import {
  Admin,
  List,
  Show,
  Edit,
  Create,
  DataTable,
  ListGuesser,
  ShowGuesser,
  EditGuesser,
  Breadcrumb,
} from "@/components/admin";
import { i18nProvider } from "@/lib/i18nProvider";
import { Link } from "react-router";

export default {
  title: "Layout/Breadcrumb",
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

export const Default = () => (
  <TestMemoryRouter initialEntries={["/products"]}>
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <Resource
        name="products"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        create={() => <Create>Create view</Create>}
        recordRepresentation="name"
      />
    </Admin>
  </TestMemoryRouter>
);

export const WithDashboard = () => (
  <TestMemoryRouter initialEntries={["/products"]}>
    <Admin
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      dashboard={() => <div>My Dashboard</div>}
    >
      <Resource
        name="products"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        create={() => <Create>Create view</Create>}
        recordRepresentation="name"
      />
    </Admin>
  </TestMemoryRouter>
);

const ListWithCustomBreadcrumb = () => (
  <List disableBreadcrumb>
    <Breadcrumb>
      <Breadcrumb.PageItem>My Products</Breadcrumb.PageItem>
    </Breadcrumb>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.NumberCol source="price" />
      <DataTable.Col source="category" />
    </DataTable>
  </List>
);

const ShowWithCustomBreadcrumb = () => (
  <Show disableBreadcrumb>
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/products">Products</Link>
      </Breadcrumb.Item>
      <Breadcrumb.PageItem>Show Product</Breadcrumb.PageItem>
    </Breadcrumb>
    Show view
  </Show>
);

const EditWithCustomBreadcrumb = () => (
  <Edit disableBreadcrumb>
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/products">Products</Link>
      </Breadcrumb.Item>
      <Breadcrumb.PageItem>Edit Product</Breadcrumb.PageItem>
    </Breadcrumb>
    Edit form
  </Edit>
);

const CreateWithCustomBreadcrumb = () => (
  <Create disableBreadcrumb>
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/products">Products</Link>
      </Breadcrumb.Item>
      <Breadcrumb.PageItem>Create Product</Breadcrumb.PageItem>
    </Breadcrumb>
    Create form
  </Create>
);

export const Custom = () => (
  <TestMemoryRouter initialEntries={["/products"]}>
    <Admin
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      dashboard={() => <div>My Dashboard</div>}
    >
      <Resource
        name="products"
        list={ListWithCustomBreadcrumb}
        show={ShowWithCustomBreadcrumb}
        edit={EditWithCustomBreadcrumb}
        create={CreateWithCustomBreadcrumb}
        recordRepresentation="name"
      />
    </Admin>
  </TestMemoryRouter>
);
