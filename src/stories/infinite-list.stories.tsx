import * as React from 'react';
import {
  DataProvider,
  useInfinitePaginationContext,
  useListContext,
  IsOffline,
  memoryStore,
  Resource,
  TestMemoryRouter,
} from "ra-core";
import { faker } from '@faker-js/faker';
import { onlineManager } from '@tanstack/react-query';
import fakeRestDataProvider from "ra-data-fakerest";

import {
  Admin,
  DataTable,
  FilterButton,
  ColumnsButton,
  ExportButton,
  InfiniteList,
  ShowGuesser,
  TextInput
} from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { InfinitePagination } from '@/components/admin/infinite-pagination';
import { Pagination as DefaultPagination } from '@/components/ui/pagination';
import { i18nProvider } from "@/lib/i18nProvider";

export default {
  title: "List/InfiniteList",
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

const CustomPagination = () => {
    const { total } = useListContext();
    return (
        <>
            <InfinitePagination />
            {total && total > 0 && (
                <div className="bottom-0 text-center sticky">
                    <Card className="px-2 py-1 mb-2 inline-block" >
                        <h2>{total} results</h2>
                    </Card>
                </div>
            )}
        </>
    );
};

export const PaginationCustom = () => (
    <Admin dataProvider={dataProvider}>
        <Resource
            name="books"
            list={() => (
                <InfiniteList pagination={<CustomPagination />}>
                    <DataTable>
                        <DataTable.Col source="id" />
                        <DataTable.Col source="title" />
                    </DataTable>
                </InfiniteList>
            )}
        />
    </Admin>
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

const filterActionButtons = [
    <TextInput source="title" />
];

export const CustomActionButtonsList = () => (
  <Wrapper>
    <InfiniteList 
        actions={<CustomActionButtons />} 
        filters={filterActionButtons}
    >
        <DataTable>
          <DataTable.Col source="id" />
          <DataTable.Col source="title" />
        </DataTable>
    </InfiniteList>
  </Wrapper>
);

const LoadMore = () => {
    const { hasNextPage, fetchNextPage, isFetchingNextPage } =
        useInfinitePaginationContext();
    return hasNextPage ? (
        <div className="mt-1 text-center">
            <Button
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
            >
                Load more
            </Button>
        </div>
    ) : null;
};

export const PaginationLoadMore = () => (
  <Wrapper>
    <InfiniteList pagination={<LoadMore />}>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col source="author" />
        </DataTable>
    </InfiniteList>
  </Wrapper>
);

export const PaginationInfinite = () => (
  <Wrapper>
    <InfiniteList
        pagination={<InfinitePagination className="py-5" />}
    >
        <DataTable>
          <DataTable.Col source="id" />
          <DataTable.Col source="title" />
        </DataTable>
    </InfiniteList>
  </Wrapper>
);

const BookListOffline = () => {
    const { error, isPending } = useListContext();
    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            <IsOffline>
                <Alert>
                    <AlertTitle>
                        You are offline, the data may be outdated
                    </AlertTitle>
                </Alert>
            </IsOffline>
            <DataTable>
              <DataTable.Col source="id" />
              <DataTable.Col source="title" />
            </DataTable>
        </>
    );
};

export const Offline = ({
    isOnline = true,
    offline,
    pagination,
}: {
    isOnline?: boolean;
    offline?: React.ReactNode;
    pagination?: React.ReactNode;
}) => {
    React.useEffect(() => {
        onlineManager.setOnline(isOnline);
    }, [isOnline]);
    return (
        <Wrapper>
            <InfiniteList offline={offline} pagination={pagination}>
                <BookListOffline />
            </InfiniteList>
        </Wrapper>
    );
};

const CustomOffline = () => {
    return <Alert>You are offline!</Alert>;
};

Offline.args = {
    isOnline: true,
    offline: false,
    pagination: 'infinite',
};

Offline.argTypes = {
    isOnline: {
        control: { type: 'boolean' },
    },
    pagination: {
        control: { type: 'radio' },
        options: ['infinite', 'classic'],
        mapping: {
            infinite: <InfinitePagination />,
            classic: <DefaultPagination />,
        },
    },
    offline: {
        name: 'Offline component',
        control: { type: 'radio' },
        options: ['default', 'custom'],
        mapping: {
            default: undefined,
            custom: <CustomOffline />,
        },
    },
};
