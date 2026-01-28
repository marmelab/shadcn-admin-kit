import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import {
  CoreAdminContext,
  type DataProvider,
  type GetListResult,
  type GetManyReferenceResult,
  type GetManyResult,
  type GetOneResult,
  type UpdateResult,
  type UpdateManyResult,
  type CreateResult,
  type DeleteResult,
  type DeleteManyResult,
  type RaRecord,
} from "ra-core";
import { MemoryRouter } from "react-router";
import { ListGuesser } from "./list-guesser";
import { i18nProvider } from "@/lib/i18nProvider";

const emptyRecord = { id: 1 } satisfies RaRecord;

const dataProvider: DataProvider = {
  getList: async () =>
    ({ data: [], total: 0 }) as GetListResult<RaRecord>,
  getOne: async () => ({ data: emptyRecord }) as GetOneResult<RaRecord>,
  getMany: async () => ({ data: [] }) as GetManyResult<RaRecord>,
  getManyReference: async () =>
    ({ data: [], total: 0 }) as GetManyReferenceResult<RaRecord>,
  update: async (_resource, params) =>
    ({ data: params.data }) as UpdateResult<RaRecord>,
  updateMany: async () => ({ data: [] }) as UpdateManyResult,
  create: async (_resource, params) =>
    ({ data: { ...emptyRecord, ...params.data } }) as CreateResult<RaRecord>,
  delete: async (_resource, params) =>
    ({ data: params.previousData ?? emptyRecord }) as DeleteResult<RaRecord>,
  deleteMany: async () => ({ data: [] }) as DeleteManyResult,
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter initialEntries={["/posts"]}>
    <CoreAdminContext dataProvider={dataProvider} i18nProvider={i18nProvider}>
      {children}
    </CoreAdminContext>
  </MemoryRouter>
);

describe("ListGuesser", () => {
  it("should render the default empty message when the list is empty", async () => {
    const screen = render(<ListGuesser resource="posts" />, {
      wrapper: TestWrapper,
    });

    await expect
      .element(screen.getByText("No data to display"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("Please check your data provider"))
      .toBeInTheDocument();
  });

  it("should render a custom empty element when provided", async () => {
    const screen = render(
      <ListGuesser resource="posts" empty={<div>Custom empty</div>} />,
      {
        wrapper: TestWrapper,
      },
    );

    await expect
      .element(screen.getByText("Custom empty"))
      .toBeInTheDocument();
  });

  it("should not render an empty element when empty is false", async () => {
    const screen = render(<ListGuesser resource="posts" empty={false} />, {
      wrapper: TestWrapper,
    });

    await expect
      .element(screen.getByText("No data to display"))
      .not.toBeInTheDocument();
  });
});
