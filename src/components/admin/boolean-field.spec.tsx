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
    const screen = render(<True />);
    expect(screen.container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("should render an icon for a false value", async () => {
    const screen = render(<False />);
    expect(screen.container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("should render the empty prop when the value is not a boolean", async () => {
    const screen = render(<Empty />);
    await expect
      .element(screen.getByLabelText("no value"))
      .toBeInTheDocument();
  });

  it("should not render an svg when the empty prop is shown", async () => {
    const screen = render(<Empty />);
    expect(screen.container.querySelectorAll("svg")).toHaveLength(0);
  });

  it("should treat truthy non-boolean values as true when looseValue is set", async () => {
    const screen = render(<LooseValue />);
    expect(screen.container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("should render an empty div when FalseIcon is null", async () => {
    const screen = render(<NoFalseIcon />);
    expect(screen.container.querySelectorAll("svg")).toHaveLength(0);
  });
});
