// This file is part of Shadcn Admin Kit (https://github.com/marmelab/shadcn-admin-kit)
import { describe, expect, it } from "vitest";
import { InputHelperText } from "./input-helper-text";
import { render } from "vitest-browser-react";
import { FormField } from "./form";
import { Form } from "ra-core";
import { MemoryRouter } from "react-router";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <Form>
      <FormField id="test-field" name="test-field">
        {children}
      </FormField>
    </Form>
  </MemoryRouter>
);

describe("InputHelperText", () => {
  it("should render helper text when provided", async () => {
    const screen = render(<InputHelperText helperText={"helper text"} />, {
      wrapper: TestWrapper,
    });

    await expect.element(screen.getByText("helper text")).toBeInTheDocument();
  });

  it("should not render anything when helperText is not provided", async () => {
    const screen = render(<InputHelperText />, {
      wrapper: TestWrapper,
    });
    await expect.element(screen.getByRole("group")).toBeEmptyDOMElement();
  });
});
