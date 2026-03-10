import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import {
  Basic,
  Disabled,
  ExternalChanges,
  ReadOnly,
  Toolbar,
  Validation,
} from "@/stories/rich-text-input.stories";

const getEditorElement = (container: HTMLElement) =>
  container.querySelector(".ProseMirror");

describe("<RichTextInput />", () => {
  it("should render the initial HTML value", async () => {
    const screen = render(<Basic theme="system" />);
    const editor = getEditorElement(screen.container);

    expect(editor).not.toBeNull();
    await expect
      .element(editor as HTMLElement)
      .toHaveTextContent("This is an initial rich text value.");
    await expect
      .element(screen.getByRole("button", { name: /bold/i }))
      .toBeInTheDocument();
  });

  it("should render as disabled", async () => {
    const screen = render(<Disabled theme="system" />);
    const editor = getEditorElement(screen.container);

    expect(editor).not.toBeNull();
    await expect.element(editor as HTMLElement).toHaveAttribute(
      "contenteditable",
      "false",
    );
    await expect
      .element(screen.getByRole("button", { name: /bold/i }))
      .toBeDisabled();
    await expect
      .element(screen.getByRole("button", { name: /text color/i }))
      .toBeDisabled();
    await expect
      .element(screen.getByRole("button", { name: /insert link/i }))
      .toBeDisabled();
    await expect
      .element(screen.getByRole("button", { name: /image/i }))
      .toBeDisabled();
  });

  it("should render as readOnly", async () => {
    const screen = render(<ReadOnly theme="system" />);
    const editor = getEditorElement(screen.container);

    expect(editor).not.toBeNull();
    await expect.element(editor as HTMLElement).toHaveAttribute(
      "contenteditable",
      "false",
    );
    await expect
      .element(screen.getByRole("button", { name: /bold/i }))
      .toBeDisabled();
    await expect
      .element(screen.getByRole("button", { name: /text color/i }))
      .toBeDisabled();
    await expect
      .element(screen.getByRole("button", { name: /insert link/i }))
      .toBeDisabled();
    await expect
      .element(screen.getByRole("button", { name: /image/i }))
      .toBeDisabled();
  });

  it("should display validation error when required and empty", async () => {
    const screen = render(<Validation theme="system" />);
    const submitButton = screen.getByRole("button", { name: /save/i });

    await submitButton.click();
    await expect.element(screen.getByText("Required")).toBeInTheDocument();
  });

  it("should update when value changes externally", async () => {
    const screen = render(<ExternalChanges theme="system" />);
    const changeValueButton = screen.getByText("Change value");

    await changeValueButton.click();

    const editor = getEditorElement(screen.container);
    expect(editor).not.toBeNull();
    await expect
      .element(editor as HTMLElement)
      .toHaveTextContent("Value changed externally.");
  });

  it("should render custom toolbar when provided", async () => {
    const screen = render(<Toolbar theme="system" />);

    await expect
      .element(screen.getByRole("button", { name: /bold/i }))
      .toBeInTheDocument();
  });

});
