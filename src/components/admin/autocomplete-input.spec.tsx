import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "@vitest/browser/context";

import {
  Create,
  InsideArrayInputWithValidation,
  WithMismatchedOptionTextAndValue,
} from "@/stories/autocomplete-input.stories";

describe("<AutocompleteInput />", () => {
  it("should display the choices and a create option if supported", async () => {
    const screen = render(<Create />);
    const combobox = screen.getByRole("combobox");
    await combobox.click();

    // All 4 options + 1 create should be visible
    const options = screen.getByRole("option");
    expect(options.all()).toHaveLength(5);
    await expect.element(options.nth(0)).toHaveTextContent("Enthusiast");
    await expect.element(options.nth(1)).toHaveTextContent("Football Fan");
    await expect.element(options.nth(2)).toHaveTextContent("VIP");
    await expect.element(options.nth(3)).toHaveTextContent("Musician");
    await expect
      .element(options.nth(4))
      .toHaveTextContent("Start typing to create a new tag");
    const searchInput = screen.getByPlaceholder("Search...");
    await userEvent.type(searchInput, "New Tag");

    await expect.poll(() => screen.getByRole("option").all()).toHaveLength(1);

    // The create option should now show the typed value
    await expect
      .element(screen.getByRole("option").nth(0))
      .toHaveTextContent("Create New Tag");
  });

  it("should filter choices by their text label", async () => {
    const screen = render(<WithMismatchedOptionTextAndValue />);
    const combobox = screen.getByRole("combobox");
    await combobox.click();

    // All 10 options should be visible
    const allOptions = screen.getByRole("option");
    expect(allOptions.all()).toHaveLength(159);

    // Type a filter that matches only 3 choice
    const searchInput = screen.getByPlaceholder("Search...");
    await userEvent.type(searchInput, "aus");

    // Only "Sarah Wilson", "Lisa Rodriguez" and Tom Anderson should remain
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

  it("should display validation error when required and empty inside ArrayInput", async () => {
    const screen = render(<InsideArrayInputWithValidation />);
    const submitButton = screen.getByRole("button", { name: /save/i });
    await submitButton.click();
    await expect.element(screen.getByText("Required")).toBeInTheDocument();
  });
});
