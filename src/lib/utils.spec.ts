import { describe, expect, test } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  test("should merge class names", () => {
    const className = cn("class1", "class2", { class3: true, class4: false });
    expect(className).toBe("class1 class2 class3");
  });
});
