const { test, expect } = require("@playwright/test");

test("Ana sayfa yükleniyor", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.locator("text=Anasayfa")).toBeVisible();
});