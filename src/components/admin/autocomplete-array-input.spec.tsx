import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import {
  Create,
  OnCreate,
  WithMismatchedOptionTextAndValue,
} from "@/stories/autocomplete-array-input.stories";

describe("<AutocompleteArrayInput />", () => {
  it("should filter choices by their text label", async () => {
    const screen = render(<WithMismatchedOptionTextAndValue />);
    const searchInput = screen.getByPlaceholder("Search");
    await searchInput.click();

    // All options should be visible
    const allOptions = screen.getByRole("option");
    expect(allOptions.all()).toHaveLength(159);

    // Type a filter that matches by text label
    await userEvent.type(searchInput, "aus");

    // Only currencies matching "aus" should remain
    await expect.poll(() => screen.getByRole("option").all()).toHaveLength(4);
    const filteredOptions = screen.getByRole("option");

    await expect
      .element(filteredOptions.nth(0))
      .toHaveTextContent("AUD - Australian Dollar");
    await expect
      .element(filteredOptions.nth(1))
      .toHaveTextContent("AED - United Arab Emirates Dirham");
    await expect
      .element(filteredOptions.nth(2))
      .toHaveTextContent("BYN - Belarusian Ruble");
    await expect
      .element(filteredOptions.nth(3))
      .toHaveTextContent("UYU - Uruguayan Peso");
  });

  it("should display a disabled create hint as long as the filter is empty", async () => {
    const screen = render(<OnCreate />);
    const searchInput = screen.getByPlaceholder("Search");
    await searchInput.click();

    // The 8 unselected choices, plus the create hint
    const options = screen.getByRole("option");
    expect(options.all()).toHaveLength(9);

    const hint = options.nth(8);
    await expect
      .element(hint)
      .toHaveTextContent("Start typing to create a new tag");
    await expect.element(hint).toHaveAttribute("aria-disabled", "true");
  });

  it("should offer to create a choice when no choice matches the filter", async () => {
    const screen = render(<OnCreate />);
    const searchInput = screen.getByPlaceholder("Search");
    await searchInput.click();
    await userEvent.type(searchInput, "gaming");

    // No choice matches "gaming", so only the create option remains
    await expect.poll(() => screen.getByRole("option").all()).toHaveLength(1);
    await expect
      .element(screen.getByRole("option").nth(0))
      .toHaveTextContent("Create gaming");
  });

  it("should add the choice created through onCreate to the selection", async () => {
    const screen = render(<OnCreate />);
    const searchInput = screen.getByPlaceholder("Search");
    await searchInput.click();
    await userEvent.type(searchInput, "gaming");

    await screen.getByRole("option", { name: "Create gaming" }).click();

    // The created choice is now selected, next to the initially selected one
    await expect.element(screen.getByText("gaming")).toBeInTheDocument();
    await expect.element(screen.getByText("Tech")).toBeInTheDocument();
  });

  it("should add the choice created through the create element to the selection", async () => {
    const screen = render(<Create />);
    const searchInput = screen.getByPlaceholder("Search");
    await searchInput.click();
    await userEvent.type(searchInput, "gaming");

    await screen.getByRole("option", { name: "Create gaming" }).click();

    // The create element receives the filter as default value
    const dialog = screen.getByRole("dialog");
    await expect.element(dialog).toHaveTextContent("Create a tag");
    await expect
      .element(screen.getByLabelText("New tag name"))
      .toHaveValue("gaming");

    // scoped to the dialog: the form has a Save button of its own
    await dialog.getByRole("button", { name: /save/i }).click();

    await expect.element(screen.getByText("gaming")).toBeInTheDocument();
  });
});
