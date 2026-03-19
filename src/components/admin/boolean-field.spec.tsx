import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import {
  True,
  False,
  Empty,
  LooseValue,
  NoFalseIcon,
} from "@/stories/boolean-field.stories";

describe("<BooleanField />", () => {
  it("should render an icon for a true value", async () => {
    const { container } = render(<True />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should render an icon for a false value", async () => {
    const { container } = render(<False />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should render the empty prop when the value is not a boolean", async () => {
    const screen = render(<Empty />);
    await expect
      .element(screen.getByLabelText("no value"))
      .toBeInTheDocument();
  });

  it("should not render an svg when the empty prop is shown", async () => {
    const { container } = render(<Empty />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("should treat truthy non-boolean values as true when looseValue is set", async () => {
    const { container } = render(<LooseValue />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should render an empty div when FalseIcon is null", async () => {
    const { container } = render(<NoFalseIcon />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });
});
