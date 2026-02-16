import {
  DataProvider,
  memoryStore,
  Resource,
  TestMemoryRouter,
} from "ra-core";
import { faker } from '@faker-js/faker';
import fakeRestDataProvider from "ra-data-fakerest";
import {
  Admin,
  FilterButton,
  DataTable,
  InfiniteList,
  ShowGuesser,
} from "@/components/admin";
import { i18nProvider } from "@/lib/i18nProvider";

export default {
  title: "InifiniteList",
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};

const data = {
  books: [...Array(200)].map((_, i) => (
    {
      id: i + 1,
      title: faker.person.firstName(),
    })),
};

const dataProvider = fakeRestDataProvider(data);

const Wrapper = ({
  children,
  defaultDataProvider = dataProvider,
}: {
  children: React.ReactNode;
  defaultDataProvider?: DataProvider;
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
          <> 
            {children}
          </>
        }
        show={ShowGuesser}
      />
    </Admin>
  </TestMemoryRouter>
);

export const Basic = () => (
  <Wrapper>
    <InfiniteList>
        <DataTable>
          <DataTable.Col source="id" />
          <DataTable.Col source="title" />
        </DataTable>
    </InfiniteList>
  </Wrapper>
);

const CustomEmpty = () => <div>No books found</div>;

export const Empty = () => (
  <Wrapper>
    <InfiniteList>
        <h1>Default</h1>
        <DataTable data={[]} total={0}>
          <DataTable.Col source="id" />
          <DataTable.Col source="title" />
        </DataTable>
        <h1>Custom</h1>
        <DataTable data={[]} total={0} empty={<CustomEmpty />}>
          <DataTable.Col source="id" />
          <DataTable.Col source="title" />
        </DataTable>
    </InfiniteList>
  </Wrapper>
);

export const RowClickFalse = () => (
  <Wrapper>
    <InfiniteList>
    <DataTable rowClick={false}>
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
    </DataTable>
    </InfiniteList>
  </Wrapper>
);


const CustomActionButtons = () => (
  <>
    <FilterButton />
    <ExportButton />
    <ColumnsButton />
  </>
);

export const CustomActionButtonsList = () => (
  <Wrapper>
    <InfiniteList actions={CustomActionButtons} >
        <DataTable>
          <DataTable.Col source="id" />
          <DataTable.Col source="title" />
        </DataTable>
    </InfiniteList>
  </Wrapper>
);
