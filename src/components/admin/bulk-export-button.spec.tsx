// This file is part of Shadcn Admin Kit (https://github.com/marmelab/shadcn-admin-kit)
import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { BulkExportButton } from "./bulk-export-button";
import {
  DataProvider,
  DataProviderContext,
  ListContextProvider,
  RecordContext,
  ResourceContextProvider,
  useList,
  UseListOptions,
} from "ra-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { useEffect } from "react";

type TestRecord = {
  id: number;
  title: string;
};

const queryClient = new QueryClient();

const defaultListContextValue: UseListOptions<TestRecord> = {
  isPending: false,
  error: null,
  data: [
    { id: 1, title: "Test Record 1" },
    { id: 2, title: "Test Record 2" },
  ],
};

const TestWrapper = ({
  listContextValue = defaultListContextValue,
  children,
}: {
  listContextValue?: UseListOptions<TestRecord>;
  children: React.ReactNode;
}) => {
  const list = useList({
    data: listContextValue.data,
  });

  useEffect(() => {
    if (list.selectedIds.length !== 0) {
      return;
    }
    list.onSelect([1]);
  }, [list]);

  const dataProvider = {
    getMany(): Promise<{ data: TestRecord[] }> {
      return Promise.resolve({
        data: [{ id: 1, title: "Test Record 1" }],
      });
    },
  } as unknown as DataProvider;

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <DataProviderContext value={dataProvider}>
          <ResourceContextProvider value="records">
            <ListContextProvider value={list}>
              <RecordContext.Provider value={{ id: 1, title: "Test Record" }}>
                {children}
              </RecordContext.Provider>
            </ListContextProvider>
          </ResourceContextProvider>
        </DataProviderContext>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("BulkExportButton", () => {
  it("should render export button", async () => {
    const screen = render(
      <TestWrapper>
        <BulkExportButton />
      </TestWrapper>
    );

    await expect
      .element(
        screen.getByRole("button", {
          name: "ra.action.export",
        })
      )
      .toBeInTheDocument();
  });

  it("should export selected records when clicked", async () => {
    const mockBulkExport = vi.fn();

    const screen = render(
      <TestWrapper>
        <BulkExportButton exporter={mockBulkExport} />
      </TestWrapper>
    );

    await screen
      .getByRole("button", {
        name: "ra.action.export",
      })
      .click();

    expect(mockBulkExport).toHaveBeenCalledWith(
      [{ id: 1, title: "Test Record 1" }],
      expect.any(Function),
      expect.any(Object),
      "records"
    );
  });
});
