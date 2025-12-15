import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { Undoable } from "@/stories/notification.stories";

describe("Notification", () => {
  it("should undo several notifications correctly", async () => {
    const screen = render(<Undoable />);
    const button = screen.getByText("Trigger mutation");
    await button.click();
    expect(screen.getByText("mutation 1 triggered"));
    await button.click();
    expect(screen.getByText("mutation 2 triggered"));
    const undoButtons = screen.getByText("ra.action.undo");
    await undoButtons.first().click();
    expect(screen.getByText("mutation 1 undone"));
    await undoButtons.last().click();
    expect(screen.getByText("mutation 2 undone"));
  });
});
