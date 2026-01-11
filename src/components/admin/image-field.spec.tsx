import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { Basic, Title, Empty, Multiple } from "@/stories/image-field.stories";

describe("<ImageField />", () => {
  it("should render an image input", async () => {
    const screen = render(<Basic />);
    await expect.element(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should use the title prop as the image title and alt attributes when title is a string", async () => {
    const screen = render(<Title />);
    const img = screen.getByRole("img");
    await expect.element(img).toHaveAttribute("title", "User Avatar");
    await expect.element(img).toHaveAttribute("alt", "User Avatar");
  });

  it("should render the empty prop when the value is null", async () => {
    const screen = render(<Empty />);
    await expect
      .element(screen.getByLabelText("no avatar"))
      .toBeInTheDocument();
  });

  it("should render multiple images when the value is an array", async () => {
    const screen = render(<Multiple />);
    const imgs = screen.getByRole("img");
    expect(imgs.elements().length).toBe(3);
  });
});
