import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { Basic } from "@/stories/select-input.stories";

/**
 * The dropdown is opened with the keyboard rather than a click: the story
 * renders the input in an unconstrained container, where the trigger is narrow
 * enough for the reset button to sit under its center.
 */
const openDropdown = async (trigger: HTMLElement) => {
  trigger.focus();
  await userEvent.keyboard("{Enter}");
};

describe("<SelectInput />", () => {
  it("should display the label of the initially selected choice, not its value", async () => {
    const screen = render(<Basic />);

    // The record holds gender: "male", whose label is "He/Him".
    await expect
      .element(screen.getByRole("combobox"))
      .toHaveTextContent("He/Him");
  });

  it("should display the label of the choice the user picks", async () => {
    const screen = render(<Basic />);
    const trigger = screen.getByRole("combobox");
    await openDropdown(trigger.element() as HTMLElement);
    await screen.getByRole("option", { name: "They/Them" }).click();

    // The form value becomes "nonbinary", the trigger must still read "They/Them".
    await expect.element(trigger).toHaveTextContent("They/Them");
  });
});
