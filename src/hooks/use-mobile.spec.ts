import { renderHook } from "vitest-browser-react";
import { describe, expect, test } from "vitest";
import { useIsMobile } from "./use-mobile";
import { page } from "@vitest/browser/context";

describe("useIsMobile", () => {
  test("should return false if browser is not mobile", async () => {
    await page.viewport(1920, 1080);
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  test("should return false if browser is mobile", async () => {
    await page.viewport(414, 896);
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });
});
