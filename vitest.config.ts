import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "~konfig": path.resolve(__dirname, "src/index.ts"),
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
