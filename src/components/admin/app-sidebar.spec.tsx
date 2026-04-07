import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import {
  DashboardMenuItemBasic,
  DashboardMenuItemWithBasename,
} from "@/stories/app-sidebar.stories";

describe("<DashboardMenuItem /> — basename support", () => {
  describe("Without basename (root deployment)", () => {
    it("should render dashboard menu item", async () => {
      const screen = render(<DashboardMenuItemBasic />);
      const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
      await expect.element(dashboardLink).toBeInTheDocument();
    });
  });

  describe("With basename (/admin sub-path deployment)", () => {
    it("should render dashboard menu item when basename is set", async () => {
      const screen = render(<DashboardMenuItemWithBasename />);
      const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
      await expect.element(dashboardLink).toBeInTheDocument();
    });
  });
});
