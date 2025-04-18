import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "ui",
      testDir: "./tests/ui",
    },
    {
      name: "api",
      testDir: "./tests/api",
    },
  ],
});