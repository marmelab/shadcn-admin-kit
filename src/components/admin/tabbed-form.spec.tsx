import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import {
  Basic,
  ThreeTabs,
  WithValidation,
  NoToolbar,
} from "@/stories/tabbed-form.stories";

describe("<TabbedForm />", () => {
  it("should render tab headers", async () => {
    const screen = render(<Basic theme="system" />);
    await expect
      .element(screen.getByRole("tab", { name: "Summary" }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole("tab", { name: "Details" }))
      .toBeInTheDocument();
  });

  it("should show the first tab content by default", async () => {
    const screen = render(<Basic theme="system" />);
    const titleInput = screen.getByRole("textbox", { name: /title/i });
    await expect.element(titleInput).toBeVisible();
  });

  it("should mount all tab content at once (not just the active tab)", async () => {
    // Both tab panels are rendered in the DOM even when not active,
    // so form validation can run across all tabs.
    const { container } = render(<Basic theme="system" />);
    // Second panel (aria-hidden) must be in the DOM with its inputs
    const secondPanel = container.querySelector("#tabpanel-1");
    expect(secondPanel).toBeTruthy();
    expect(secondPanel!.querySelector("input")).toBeTruthy();
  });

  it("should hide inactive tab content via display:none", async () => {
    const { container } = render(<Basic theme="system" />);
    // Second tab panel should be hidden
    const hiddenPanel = container.querySelector('[aria-hidden="true"]');
    expect(hiddenPanel).toBeTruthy();
    expect((hiddenPanel as HTMLElement).style.display).toBe("none");
  });

  it("should show second tab content when its header is clicked", async () => {
    const screen = render(<Basic theme="system" />);
    const detailsTab = screen.getByRole("tab", { name: "Details" });
    await detailsTab.click();
    const authorInput = screen.getByRole("textbox", { name: /author/i });
    await expect.element(authorInput).toBeVisible();
  });

  it("should hide first tab content after switching to second tab", async () => {
    const { container, getByRole } = render(<Basic theme="system" />);
    await getByRole("tab", { name: "Details" }).click();
    // First panel is still in the DOM but hidden via display:none + aria-hidden
    const firstPanel = container.querySelector("#tabpanel-0") as HTMLElement;
    expect(firstPanel).toBeTruthy();
    expect(firstPanel.style.display).toBe("none");
    // Its inputs are still mounted (required for cross-tab validation)
    expect(firstPanel.querySelector("input")).toBeTruthy();
  });

  it("should render all three tabs", async () => {
    const screen = render(<ThreeTabs theme="system" />);
    await expect
      .element(screen.getByRole("tab", { name: "Summary" }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole("tab", { name: "Body" }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole("tab", { name: "Details" }))
      .toBeInTheDocument();
  });

  it("should navigate between multiple tabs", async () => {
    const screen = render(<ThreeTabs theme="system" />);
    await screen.getByRole("tab", { name: "Body" }).click();
    const bodyInput = screen.getByRole("textbox", { name: /body/i });
    await expect.element(bodyInput).toBeVisible();
    await screen.getByRole("tab", { name: "Details" }).click();
    const authorInput = screen.getByRole("textbox", { name: /author/i });
    await expect.element(authorInput).toBeVisible();
  });

  it("should render the default toolbar with save and cancel buttons", async () => {
    const screen = render(<Basic theme="system" />);
    await expect
      .element(screen.getByRole("button", { name: /save/i }))
      .toBeInTheDocument();
  });

  it("should not render a toolbar when toolbar={false}", async () => {
    const screen = render(<NoToolbar theme="system" />);
    const saveButton = screen.getByRole("button", { name: /save/i });
    await expect.element(saveButton).not.toBeInTheDocument();
  });

  it("should show validation errors after attempting to submit with empty required fields", async () => {
    const { container, getByRole } = render(<WithValidation theme="system" />);
    await getByRole("button", { name: /save/i }).click();
    // react-hook-form marks invalid inputs with aria-invalid="true"
    const invalidInput = container.querySelector('[aria-invalid="true"]');
    expect(invalidInput).toBeTruthy();
  });

  it("should associate tab panels with tab headers via aria attributes", async () => {
    const { container } = render(<Basic theme="system" />);
    const firstTab = container.querySelector('[role="tab"][id^="tabheader-"]') as HTMLElement;
    expect(firstTab).toBeTruthy();
    const value = firstTab.id.replace("tabheader-", "");
    // The corresponding panel must exist and point back to the tab header
    const panel = container.querySelector(`#tabpanel-${value}`) as HTMLElement;
    expect(panel).toBeTruthy();
    expect(panel.getAttribute("role")).toBe("tabpanel");
    expect(panel.getAttribute("aria-labelledby")).toBe(`tabheader-${value}`);
  });
});
