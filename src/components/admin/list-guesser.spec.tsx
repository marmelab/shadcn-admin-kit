import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import {
  CoreAdminContext,
  type DataProvider,
} from "ra-core";
import { MemoryRouter } from "react-router";
import { ListGuesser } from "./list-guesser";
import { i18nProvider } from "@/lib/i18nProvider";

const dataProvider = {
  getList: async () => ({ data: [], total: 0 }),
  getOne: async () => ({ data: { id: 1 } }),
  getMany: async () => ({ data: [] }),
  getManyReference: async () => ({ data: [], total: 0 }),
  update: async (_resource: string, params: { data: unknown }) => ({
    data: params.data,
  }),
  updateMany: async () => ({ data: [] }),
  create: async (_resource: string, params: { data: unknown }) => ({
    data: { id: 1, ...((params.data as object) ?? {}) },
  }),
  delete: async (_resource: string, params: { previousData?: unknown }) => ({
    data: params.previousData ?? { id: 1 },
  }),
  deleteMany: async () => ({ data: [] }),
} as unknown as DataProvider;

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
      .element(screen.getByText("No Posts yet."))
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
      .element(screen.getByText("No Posts yet."))
      .not.toBeInTheDocument();
  });
});
