/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListContextProvider, type ListControllerSuccessResult } from "ra-core";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { DataTable } from "./data-table";

describe("DataTable", () => {
  it("should render a skeleton when isPending is true", async () => {
    render(
      <ListContextProvider value={{ perPage: 25 } as ListControllerSuccessResult}>
        <DataTable isPending={true}>
          <DataTable.Col source="id" />
        </DataTable>
      </ListContextProvider>,
    );

    const rows = document.querySelectorAll("tbody tr");
    expect(rows.length).toBe(25);
  });

  it("should render the localized no results message when empty", async () => {
    render(
      <ListContextProvider value={{ data: [], total: 0 } as any}>
        <DataTable data={[]} total={0}>
          <DataTable.Col source="id" />
        </DataTable>
      </ListContextProvider>,
    );

    expect(document.body.textContent).toContain("No results found.");
  });
});
