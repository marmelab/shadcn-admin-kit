import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import {
  Basic,
  CustomLabel,
  ResourceSpecificLabel,
} from "@/stories/delete-button.stories";

describe("<DeleteButton />", () => {
  it("should render with the default label", async () => {
    const screen = render(<Basic />);
    await expect
      .element(screen.getByRole("button", { name: "Delete" }))
      .toBeInTheDocument();
  });

  it("should render with a custom label", async () => {
    const screen = render(<CustomLabel />);
    await expect
      .element(screen.getByRole("button", { name: "Remove" }))
      .toBeInTheDocument();
  });

  it("should render with a resource-specific label", async () => {
    const screen = render(<ResourceSpecificLabel />);
    await expect
      .element(screen.getByRole("button", { name: "Remove this post" }))
      .toBeInTheDocument();
  });
});
