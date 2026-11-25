import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import {
  Basic,
  CustomPath,
  NoSyncWithLocation,
  PostEdit,
  Validation,
} from "@/stories/tabbed-form.stories";

describe("<TabbedForm />", () => {
  it("should display the tabs and only the first tab content", async () => {
    const screen = render(<Basic />);
    await expect.element(screen.getByLabelText("Title")).toBeVisible();
    await expect
      .element(screen.getByRole("tab", { name: "main" }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole("tab", { name: "details (3)" }))
      .toBeInTheDocument();
    await expect.element(screen.getByLabelText("Bio")).not.toBeVisible();
  });

  it("should show the tab content when clicking on its header", async () => {
    const screen = render(<Basic />);
    await screen.getByRole("tab", { name: "details (3)" }).click();
    await expect.element(screen.getByLabelText("Bio")).toBeVisible();
    await expect.element(screen.getByLabelText("Title")).not.toBeVisible();
    await screen.getByRole("tab", { name: "main" }).click();
    await expect.element(screen.getByLabelText("Title")).toBeVisible();
  });

  it("should open the tab matching the location", async () => {
    const screen = render(<CustomPath />);
    await expect.element(screen.getByLabelText("Bio")).toBeVisible();
    await expect.element(screen.getByLabelText("Title")).not.toBeVisible();
  });

  it("should switch tabs when syncWithLocation is false", async () => {
    const screen = render(<NoSyncWithLocation />);
    await expect.element(screen.getByLabelText("Title")).toBeVisible();
    await screen.getByRole("tab", { name: "details" }).click();
    await expect.element(screen.getByLabelText("Bio")).toBeVisible();
    await expect.element(screen.getByLabelText("Title")).not.toBeVisible();
  });

  it("should highlight inactive tabs with errors on submit", async () => {
    const screen = render(<Validation />);
    await expect.element(screen.getByLabelText("Title")).toBeVisible();
    await expect
      .element(screen.getByRole("tab", { name: "details" }))
      .not.toHaveClass("text-destructive");
    await screen.getByRole("button", { name: "Save" }).click();
    await expect
      .element(screen.getByRole("tab", { name: "details" }))
      .toHaveClass("text-destructive");
    await expect
      .element(screen.getByRole("tab", { name: "main" }))
      .not.toHaveClass("text-destructive");
  });

  it("should render inputs and reference fields in tabs", async () => {
    const screen = render(<PostEdit />);
    await expect.element(screen.getByLabelText("Title")).toBeVisible();
    await screen.getByRole("tab", { name: "Body" }).click();
    await expect.element(screen.getByText("small and frequent")).toBeVisible();
    await screen.getByRole("tab", { name: "Miscellaneous" }).click();
    await expect.element(screen.getByLabelText("Nb views")).toBeVisible();
    await screen.getByRole("tab", { name: "Comments" }).click();
    await expect
      .element(screen.getByText("Great tips, thanks for sharing."))
      .toBeVisible();
    await expect.element(screen.getByLabelText("Title")).not.toBeVisible();
  });
});
