// This file is part of Shadcn Admin Kit (https://github.com/marmelab/shadcn-admin-kit)
import { RecordContextProvider, useListContext } from "ra-core";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { ArrayField } from "./array-field";

const TEST_RECORD = {
  id: "record-1",
  values: [{ id: "value-1" }, { id: "value-2" }, { id: "value-3" }],
};

function TestConsumer() {
  const { data = [] } = useListContext<(typeof TEST_RECORD.values)[number]>();
  return (
    <ul>
      {data.map((value) => (
        <li key={value.id} aria-label={value.id}>
          {value.id}
        </li>
      ))}
    </ul>
  );
}

describe("ArrayField", () => {
  it("should pass the value to the list context", async () => {
    const screen = render(
      <RecordContextProvider value={TEST_RECORD}>
        <ArrayField source="values">
          <TestConsumer />
        </ArrayField>
      </RecordContextProvider>
    );

    await expect.element(screen.getByRole("list")).toBeInTheDocument();
    for (const value of TEST_RECORD.values) {
      await expect
        .element(screen.getByRole("listitem", { name: value.id }))
        .toHaveTextContent(value.id);
    }
  });

  it("should pass empty list to the list context when no data is provided", async () => {
    const screen = render(
      <RecordContextProvider value={{ id: "empty-record", values: [] }}>
        <ArrayField source="values">
          <TestConsumer />
        </ArrayField>
      </RecordContextProvider>
    );

    await expect.element(screen.getByRole("list")).toBeInTheDocument();
    await expect.element(screen.getByRole("listitem")).not.toBeInTheDocument();
  });

  it("should pass an empty list to the list context when source does not exist", async () => {
    const screen = render(
      <RecordContextProvider value={{ id: "empty-record" }}>
        <ArrayField source="values">
          <TestConsumer />
        </ArrayField>
      </RecordContextProvider>
    );

    await expect.element(screen.getByRole("list")).toBeInTheDocument();
    await expect.element(screen.getByRole("listitem")).not.toBeInTheDocument();
  });
});
