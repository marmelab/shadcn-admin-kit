import { describe, expect, it } from "vitest";
import { InputHelperText } from "./input-helper-text";
import { render } from "vitest-browser-react";

describe("InputHelperText", () => {
  it("should render error message when provided", async () => {
    const screen = render(
      <InputHelperText error={"error"} helperText={"helper text"} />
    );

    await expect.element(screen.getByText("error")).toBeInTheDocument();
  });

  it("should render helper text when provided", async () => {
    const screen = render(
      <InputHelperText error={undefined} helperText={"helper text"} />
    );

    await expect.element(screen.getByText("helper text")).toBeInTheDocument();
  });

  it("should not render anything when neither error nor helperText is provided", async () => {
    const screen = render(
      <InputHelperText error={undefined} helperText={undefined} />
    );

    await expect.element(screen.container).toBeEmptyDOMElement();
  });
});
