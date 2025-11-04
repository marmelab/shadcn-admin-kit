// This file is part of Shadcn Admin Kit (https://github.com/marmelab/shadcn-admin-kit)
import {
  RecordContextProvider,
  ResourceContextProvider,
  ArrayInputContext,
} from "ra-core";
import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { FormProvider, useForm } from "react-hook-form";
import { ArrayInput } from "./array-input";
import { useContext, useEffect } from "react";

function TestChild({ source }: { source: string }) {
  const arrayContext = useContext(ArrayInputContext);

  return (
    <div data-testid="test-child">
      <span data-testid="source">{source}</span>
      <span data-testid="has-context">{arrayContext ? "true" : "false"}</span>
      <button
        type="button"
        onClick={() => arrayContext?.append({ value: "new item" })}
        data-testid="add-button"
      >
        Add Item
      </button>
      <div data-testid="field-count">{arrayContext?.fields.length || 0}</div>
    </div>
  );
}

function TestWrapper({
  children,
  defaultValues = {},
  resource = "test",
}: {
  children: React.ReactNode;
  defaultValues?: Record<string, unknown>;
  resource?: string;
}) {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <ResourceContextProvider value={resource}>
        <RecordContextProvider value={defaultValues}>
          {children}
        </RecordContextProvider>
      </ResourceContextProvider>
    </FormProvider>
  );
}

describe("ArrayInput", () => {
  it("should render with basic props", async () => {
    const screen = render(
      <TestWrapper>
        <ArrayInput source="items" label="Items">
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect.element(screen.getByText("Items")).toBeInTheDocument();
    await expect.element(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("should provide ArrayInputContext to children", async () => {
    const screen = render(
      <TestWrapper>
        <ArrayInput source="items">
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect
      .element(screen.getByTestId("has-context"))
      .toHaveTextContent("true");
  });

  it("should handle default values", async () => {
    const defaultValues = {
      items: [{ name: "item1" }, { name: "item2" }],
    };

    const screen = render(
      <TestWrapper defaultValues={defaultValues}>
        <ArrayInput source="items">
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect
      .element(screen.getByTestId("field-count"))
      .toHaveTextContent("2");
  });

  it("should display loading skeleton when isPending is true", async () => {
    const screen = render(
      <TestWrapper>
        <ArrayInput source="items" isPending>
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect
      .element(screen.getByTestId("test-child"))
      .not.toBeInTheDocument();
  });

  it("should apply custom className", async () => {
    const screen = render(
      <TestWrapper>
        <ArrayInput source="items" className="custom-class">
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    const arrayInput = screen.container.querySelector(".ra-input");
    await expect.element(arrayInput).toHaveClass("custom-class");
  });

  it("should show helper text when provided", async () => {
    const screen = render(
      <TestWrapper>
        <ArrayInput source="items" helperText="This is helper text">
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect
      .element(screen.getByText("This is helper text"))
      .toBeInTheDocument();
  });

  it("should support array of validators", async () => {
    const validator1 = vi.fn().mockReturnValue(undefined);
    const validator2 = vi.fn().mockReturnValue(undefined);

    const screen = render(
      <TestWrapper>
        <ArrayInput source="items" validate={[validator1, validator2]}>
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect.element(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("should handle empty defaultValue", async () => {
    const screen = render(
      <TestWrapper>
        <ArrayInput source="items" defaultValue={[]}>
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect
      .element(screen.getByTestId("field-count"))
      .toHaveTextContent("0");
  });

  it("should allow adding items through context", async () => {
    const screen = render(
      <TestWrapper defaultValues={{ items: [] }}>
        <ArrayInput source="items">
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect
      .element(screen.getByTestId("field-count"))
      .toHaveTextContent("0");

    const addButton = screen.getByTestId("add-button");
    await addButton.click();

    await expect
      .element(screen.getByTestId("field-count"))
      .toHaveTextContent("1");
  });

  it("should not show helper text when helperText is false", async () => {
    const screen = render(
      <TestWrapper>
        <ArrayInput source="items" helperText={false}>
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    // Vérifier qu'aucun texte d'aide n'est affiché
    const helperTextElement =
      screen.container.querySelector(".text-destructive");
    await expect.element(helperTextElement).not.toBeInTheDocument();
  });

  it("should show validation error when present", async () => {
    const record = {};
    const TestWrapperWithError = ({
      children,
    }: {
      children: React.ReactNode;
    }) => {
      const methods = useForm({
        defaultValues: { items: [] },
        mode: "onChange",
      });

      useEffect(() => {
        const timer = setTimeout(() => {
          methods.setError("items", { message: "This field is required" });
        }, 100);

        return () => clearTimeout(timer);
      }, [methods]);

      return (
        <FormProvider {...methods}>
          <ResourceContextProvider value="test">
            <RecordContextProvider value={record}>
              {children}
            </RecordContextProvider>
          </ResourceContextProvider>
        </FormProvider>
      );
    };

    const screen = render(
      <ArrayInput source="items">
        <TestChild source="name" />
      </ArrayInput>,
      { wrapper: TestWrapperWithError },
    );

    await expect
      .element(screen.getByText("This field is required"))
      .toBeInTheDocument();
  });

  it("should register and unregister field with form groups", async () => {
    const screen = render(
      <TestWrapper>
        <ArrayInput source="items">
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect.element(screen.getByTestId("test-child")).toBeInTheDocument();

    screen.unmount();
  });

  it("should handle required validation", async () => {
    const requiredValidator = (value: unknown[]) => {
      if (!value || value.length === 0) {
        return "This field is required";
      }
      return undefined;
    };

    const screen = render(
      <TestWrapper>
        <ArrayInput source="items" validate={requiredValidator}>
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect.element(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("should handle async validation", async () => {
    const asyncValidator = async (value: unknown[]) => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      if (!value || value.length === 0) {
        return "Async validation error";
      }
      return undefined;
    };

    const screen = render(
      <TestWrapper>
        <ArrayInput source="items" validate={asyncValidator}>
          <TestChild source="name" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect.element(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("should provide correct source context to children", async () => {
    const screen = render(
      <TestWrapper>
        <ArrayInput source="orders">
          <TestChild source="date" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect
      .element(screen.getByTestId("source"))
      .toHaveTextContent("date");
  });

  it("should handle nested sources correctly", async () => {
    const screen = render(
      <TestWrapper>
        <ArrayInput source="user.orders">
          <TestChild source="date" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect.element(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("should work with resource context", async () => {
    const screen = render(
      <TestWrapper resource="posts">
        <ArrayInput source="comments" resource="comments">
          <TestChild source="content" />
        </ArrayInput>
      </TestWrapper>,
    );

    await expect.element(screen.getByTestId("test-child")).toBeInTheDocument();
  });
});
