import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    include: [
      "src/components/admin/**/*.spec.{ts,tsx}",
      "src/{hooks,lib}/**/*.spec.{ts,tsx}",
    ],
    browser: {
      enabled: true,
      provider: "playwright",
      instances: [
        {
          browser: "chromium",
          viewport: {
            width: 1920,
            height: 1080,
          },
        },
      ],
    },
  },
});
