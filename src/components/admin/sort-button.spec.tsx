import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import {
  Basic,
  CustomLabel,
  ResourceSpecificLabel,
} from "@/stories/sort-button.stories";

describe("<SortButton />", () => {
  it("should render with the default label", async () => {
    const screen = render(<Basic />);
    await expect
      .element(screen.getByText("Sort by id ascending"))
      .toBeInTheDocument();
  });

  it("should render with a custom label", async () => {
    const screen = render(<CustomLabel />);
    await expect
      .element(screen.getByText("Ordered by id (ascending)"))
      .toBeInTheDocument();
  });

  it("should render with a resource-specific label", async () => {
    const screen = render(<ResourceSpecificLabel />);
    await expect
      .element(screen.getByText("Sorted by id (ascending)"))
      .toBeInTheDocument();
  });
});
