import { DataProvider, memoryStore, Resource, TestMemoryRouter } from "ra-core";
import fakeRestDataProvider from "ra-data-fakerest";
import {
  Admin,
  CreateButton,
  DataTable,
  EditButton,
  List,
  ShowGuesser,
} from "@/components/admin";
import { i18nProvider } from "@/lib/i18nProvider";

export default {
  title: "List/DataTable",
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};

const data = {
  books: [
    {
      id: 1,
      title: "War and Peace",
      author: { name: "Leo Tolstoy" },
      year: 1869,
    },
    {
      id: 2,
      title: "Pride and Prejudice",
      author: { name: "Jane Austen" },
      year: 1813,
    },
    {
      id: 3,
      title: "The Picture of Dorian Gray",
      author: { name: "Oscar Wilde" },
      year: 1890,
    },
    {
      id: 4,
      title: "Le Petit Prince",
      author: { name: "Antoine de Saint-Exupéry" },
      year: 1943,
    },
    {
      id: 5,
      title: "The Alchemist",
      author: { name: "Paulo Coelho" },
      year: 1988,
    },
    {
      id: 6,
      title: "Madame Bovary",
      author: { name: "Gustave Flaubert" },
      year: 1857,
    },
    {
      id: 7,
      title: "The Lord of the Rings",
      author: { name: "J. R. R. Tolkien" },
      year: 1954,
    },
  ],
};

const dataProvider = fakeRestDataProvider(data);

const Wrapper = ({
  children,
  defaultDataProvider = dataProvider,
  //   resource = "books",
  actions = null,
  // aside = null,
}: {
  children: React.ReactNode;
  defaultDataProvider?: DataProvider;
  //   resource?: string;
  actions?: React.ReactNode;
  // aside?: React.ReactNode;
}) => (
  <TestMemoryRouter initialEntries={["/books"]}>
    <Admin
      dataProvider={defaultDataProvider}
      i18nProvider={i18nProvider}
      store={memoryStore()}
    >
      <Resource
        name="books"
        list={
          <List
            perPage={5}
            // sx={{ p: 4 }}
            actions={actions}
            // aside={aside}
            sort={{ field: "id", order: "ASC" }}
          >
            {children}
          </List>
        }
        show={ShowGuesser}
      />
    </Admin>
  </TestMemoryRouter>
);

export const Basic = () => (
  <Wrapper>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
      <DataTable.Col label="Author" source="author.name" />
      <DataTable.Col source="year" />
    </DataTable>
  </Wrapper>
);

const CustomEmpty = () => <div>No books found</div>;

export const Empty = () => (
  <Wrapper>
    <h1>Default</h1>
    <DataTable data={[]} total={0}>
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
      <DataTable.Col source="author.name" />
      <DataTable.Col source="year" />
    </DataTable>
    <h1>Custom</h1>
    <DataTable data={[]} total={0} empty={<CustomEmpty />}>
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
      <DataTable.Col source="author.name" />
      <DataTable.Col source="year" />
    </DataTable>
  </Wrapper>
);

export const RowClickFalse = () => (
  <Wrapper>
    <DataTable rowClick={false}>
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
      <DataTable.Col source="author.name" />
      <DataTable.Col source="year" />
    </DataTable>
  </Wrapper>
);

export const HeaderButton = () => (
  <Wrapper>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
      <DataTable.Col label="Author" source="author.name" disableSort />
      <DataTable.Col source="year" />
      <DataTable.Col label={<CreateButton />}>
        <EditButton />
      </DataTable.Col>
    </DataTable>
  </Wrapper>
);
