import React from "react";
import { DataProvider, memoryStore, Resource, TestMemoryRouter } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import {
  Admin,
  DataTable,
  List,
  ShowGuesser,
  ColumnsButton,
} from "@/components/admin";
import fakeRestDataProvider from "ra-data-fakerest";

export default {
  title: "List/ColumnsButton",
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
  defaultDataProvider = dataProvider,
  actions = false,
}: {
  defaultDataProvider?: DataProvider;
  actions?: React.ReactElement | false;
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
          <List perPage={5} actions={actions}>
            <DataTable>
              <DataTable.Col source="id" />
              <DataTable.Col source="title" />
              <DataTable.Col label="Author" source="author.name" />
              <DataTable.Col source="year" />
              <DataTable.Col source="more" />
              <DataTable.Col source="than" />
              <DataTable.Col source="five" />
              <DataTable.Col source="columns" />
            </DataTable>
          </List>
        }
        show={ShowGuesser}
      />
    </Admin>
  </TestMemoryRouter>
);

export const Basic = () => <Wrapper actions={<ColumnsButton />} />;
