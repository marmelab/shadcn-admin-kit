import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "@vitest/browser/context";

import {
  Basic,
  WithPlaceholder,
  WithHelperText,
  WithValidation,
  Disabled,
  WithFormat,
  WithParse,
  WithFormatAndParse,
} from "@/stories/text-array-input.stories";

describe("<TextArrayInput />", () => {
  it("should render existing values as badges", async () => {
    const screen = render(<Basic theme="system" />);
    await expect
      .element(screen.getByText("react"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("typescript"))
      .toBeInTheDocument();
  });

  it("should add a value when pressing Enter", async () => {
    const screen = render(<Basic theme="system" />);
    const input = screen.getByRole("textbox");
    await input.click();
    await input.fill("vue");
    await userEvent.keyboard("{Enter}");
    await expect.element(screen.getByText("vue")).toBeInTheDocument();
  });

  it("should not add duplicate values", async () => {
    const screen = render(<Basic theme="system" />);
    const input = screen.getByRole("textbox");
    await input.click();
    await input.fill("react");
    await userEvent.keyboard("{Enter}");
    const badges = screen.getByText("react");
    expect(badges.all()).toHaveLength(1);
  });

  it("should not add empty values", async () => {
    const screen = render(<Basic theme="system" />);
    const input = screen.getByRole("textbox");
    await input.click();
    await input.fill("   ");
    await userEvent.keyboard("{Enter}");
    // Should still only have the original 2 remove buttons
    const removeButtons = screen.getByText("Remove");
    expect(removeButtons.all()).toHaveLength(2);
  });

  it("should remove the last value when pressing Backspace on empty input", async () => {
    const screen = render(<Basic theme="system" />);
    await expect
      .element(screen.getByText("typescript"))
      .toBeInTheDocument();
    const input = screen.getByRole("textbox");
    await input.click();
    await userEvent.keyboard("{Backspace}");
    await expect
      .element(screen.getByText("typescript"))
      .not.toBeInTheDocument();
  });

  it("should remove a specific value when clicking its remove button", async () => {
    const screen = render(<Basic theme="system" />);
    await expect
      .element(screen.getByText("react"))
      .toBeInTheDocument();
    const removeButtons = screen.getByText("Remove");
    await removeButtons.first().click();
    await expect
      .element(screen.getByText("react"))
      .not.toBeInTheDocument();
  });

  it("should add value on blur", async () => {
    const screen = render(<Basic theme="system" />);
    const input = screen.getByRole("textbox");
    await input.click();
    await input.fill("svelte");
    // Click outside to blur
    await screen.getByText("Tags").click();
    await expect
      .element(screen.getByText("svelte"))
      .toBeInTheDocument();
  });

  it("should show placeholder when no values exist", async () => {
    const screen = render(<WithPlaceholder theme="system" />);
    const input = screen.getByPlaceholder("Type an email and press Enter");
    await expect.element(input).toBeInTheDocument();
  });

  it("should show helper text", async () => {
    const screen = render(<WithHelperText theme="system" />);
    await expect
      .element(screen.getByText("Press Enter to add a tag"))
      .toBeInTheDocument();
  });

  it("should show validation error when required and empty", async () => {
    const screen = render(<WithValidation theme="system" />);
    const submitButton = screen.getByRole("button", { name: /save/i });
    await submitButton.click();
    await expect
      .element(screen.getByText("Required"))
      .toBeInTheDocument();
  });

  it("should render as disabled", async () => {
    const screen = render(<Disabled theme="system" />);
    const input = screen.getByRole("textbox");
    await expect.element(input).toBeDisabled();
  });

  it("should apply format to display values", async () => {
    const screen = render(<WithFormat theme="system" />);
    // Stored as REACT/TYPESCRIPT, displayed as lowercase via format
    await expect
      .element(screen.getByText("react"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("typescript"))
      .toBeInTheDocument();
  });

  it("should apply parse when adding values", async () => {
    const screen = render(<WithParse theme="system" />);
    const input = screen.getByRole("textbox");
    await input.click();
    await input.fill("  VUE  ");
    await userEvent.keyboard("{Enter}");
    // parse lowercases and trims
    await expect
      .element(screen.getByText("vue"))
      .toBeInTheDocument();
  });

  it("should apply both format and parse", async () => {
    const screen = render(<WithFormatAndParse theme="system" />);
    // Stored as lowercase, displayed as uppercase via format
    await expect
      .element(screen.getByText("REACT"))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText("TYPESCRIPT"))
      .toBeInTheDocument();
  });
});
