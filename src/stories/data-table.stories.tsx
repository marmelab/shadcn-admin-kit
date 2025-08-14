import {
  DataProvider,
  memoryStore,
  Resource,
  TestMemoryRouter,
  useListContext,
} from "ra-core";
import fakeRestDataProvider from "ra-data-fakerest";
import {
  Admin,
  BulkDeleteButton,
  CreateButton,
  DataTable,
  EditButton,
  List,
  ShowGuesser,
} from "@/components/admin";
import { i18nProvider } from "@/lib/i18nProvider";
import { BulkExportButton } from "@/components/admin/bulk-export-button";
import { Button } from "@/components/ui/button";

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
  actions = null,
}: {
  children: React.ReactNode;
  defaultDataProvider?: DataProvider;
  actions?: React.ReactNode;
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
            actions={actions}
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

const SelectAllButton = () => {
  const { selectedIds, onSelectAll, total } = useListContext();
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        onSelectAll();
      }}
      disabled={selectedIds.length === total}
    >
      Select All
    </Button>
  );
};

const CustomBulkActionButtons = () => (
  <>
    <SelectAllButton />
    <BulkExportButton />
    <BulkDeleteButton />
  </>
);

export const BulkActionButtons = () => (
  <Wrapper>
    <div className="flex flex-col gap-4">
      <div>
        <h1>Custom</h1>
        <DataTable bulkActionButtons={<CustomBulkActionButtons />}>
          <DataTable.Col source="id" />
          <DataTable.Col source="title" />
          <DataTable.Col source="author.name" />
          <DataTable.Col source="year" />
        </DataTable>
      </div>

      <div>
        <h1>Disabled</h1>
        <DataTable bulkActionButtons={false}>
          <DataTable.Col source="id" />
          <DataTable.Col source="title" />
          <DataTable.Col source="author.name" />
          <DataTable.Col source="year" />
        </DataTable>
      </div>
    </div>
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
