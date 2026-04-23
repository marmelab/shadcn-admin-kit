import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { Basic, WithBasename } from "@/stories/auth-error.stories";

describe("<AuthError /> — basename support", () => {
  describe("Without basename (root deployment)", () => {
    it("should render with sign-in link", async () => {
      const screen = render(<Basic />);
      const signInLink = screen.getByRole("link", { name: /sign in/i });
      await expect.element(signInLink).toBeInTheDocument();
    });
  });

  describe("With basename (/admin sub-path deployment)", () => {
    it("should render with sign-in link when basename is set", async () => {
      const screen = render(<WithBasename />);
      const signInLink = screen.getByRole("link", { name: /sign in/i });
      await expect.element(signInLink).toBeInTheDocument();
    });
  });
});
