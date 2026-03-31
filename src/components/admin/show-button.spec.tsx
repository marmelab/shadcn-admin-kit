import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import {
  Basic,
  CustomLabel,
  ResourceSpecificLabel,
} from "@/stories/show-button.stories";

describe("<ShowButton />", () => {
  it("should render with the default label", async () => {
    const screen = render(<Basic />);
    await expect
      .element(screen.getByRole("link", { name: "Show" }))
      .toBeInTheDocument();
  });

  it("should render with a custom label", async () => {
    const screen = render(<CustomLabel />);
    await expect
      .element(screen.getByRole("link", { name: "View Details" }))
      .toBeInTheDocument();
  });

  it("should render with a resource-specific label", async () => {
    const screen = render(<ResourceSpecificLabel />);
    await expect
      .element(screen.getByRole("link", { name: "View post" }))
      .toBeInTheDocument();
  });
});
