import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { Basic } from "@/stories/access-denied.stories";

describe("<AccessDenied />", () => {
  it("should be displayed when the user cannot access the resource", async () => {
    const screen = render(<Basic />);
    await expect.element(screen.getByText("Access denied")).toBeInTheDocument();
  });
});
