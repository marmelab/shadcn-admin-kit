import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "@vitest/browser/context";

import { WithMismatchedOptionTextAndValue } from "@/stories/autocomplete-array-input.stories";

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
});
