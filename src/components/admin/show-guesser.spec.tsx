import { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { I18nContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider";
import { ShowGuesser } from "./show-guesser";

let showContext = {
  record: undefined as unknown,
  isLoading: false,
  isPending: false,
  error: undefined as unknown,
};

vi.mock("ra-core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("ra-core")>();
  return {
    ...actual,
    ShowBase: ({ children }: { children: ReactNode }) => <>{children}</>,
    useShowContext: () => showContext,
    useResourceContext: () => "posts",
  };
});

const TestWrapper = ({ children }: { children: ReactNode }) => (
  <I18nContextProvider value={i18nProvider}>{children}</I18nContextProvider>
);

describe("ShowGuesser", () => {
  beforeEach(() => {
    showContext = {
      record: undefined,
      isLoading: false,
      isPending: false,
      error: undefined,
    };
  });

  it("should render the default empty message when no record is available", async () => {
    const screen = render(<ShowGuesser />, { wrapper: TestWrapper });

    await expect
      .element(screen.getByText("No data to display"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("Please check your data provider"))
      .toBeInTheDocument();
  });

  it("should render a custom empty element when provided", async () => {
    const screen = render(<ShowGuesser empty={<div>Custom empty</div>} />, {
      wrapper: TestWrapper,
    });

    await expect
      .element(screen.getByText("Custom empty"))
      .toBeInTheDocument();
  });

  it("should not render an empty element when empty is false", async () => {
    const screen = render(<ShowGuesser empty={false} />, {
      wrapper: TestWrapper,
    });

    await expect
      .element(screen.getByText("No data to display"))
      .not.toBeInTheDocument();
  });
});
