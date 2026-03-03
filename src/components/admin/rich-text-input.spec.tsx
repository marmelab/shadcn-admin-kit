import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import {
  Basic,
  CustomToolbar,
  Disabled,
  ExternalChanges,
  ReadOnly,
  WithoutToolbar,
  WithValidation,
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
  });

  it("should render as disabled", async () => {
    const screen = render(<Disabled theme="system" />);
    const editor = getEditorElement(screen.container);

    expect(editor).not.toBeNull();
    await expect.element(editor as HTMLElement).toHaveAttribute(
      "contenteditable",
      "false",
    );
  });

  it("should render as readOnly", async () => {
    const screen = render(<ReadOnly theme="system" />);
    const editor = getEditorElement(screen.container);

    expect(editor).not.toBeNull();
    await expect.element(editor as HTMLElement).toHaveAttribute(
      "contenteditable",
      "false",
    );
  });

  it("should display validation error when required and empty", async () => {
    const screen = render(<WithValidation theme="system" />);
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

  it("should hide toolbar when toolbar is false", async () => {
    const screen = render(<WithoutToolbar theme="system" />);

    expect(
      screen.container.querySelector('[data-slot="minimal-tiptap-toolbar"]'),
    ).toBeNull();
  });

  it("should render custom toolbar when provided", async () => {
    const screen = render(<CustomToolbar theme="system" />);

    await expect.element(screen.getByText("Custom toolbar")).toBeInTheDocument();
    await expect
      .element(screen.getByRole("button", { name: /bold/i }))
      .toBeInTheDocument();
  });

});
