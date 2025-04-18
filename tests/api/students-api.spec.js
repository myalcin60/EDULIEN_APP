const { test, expect } = require("@playwright/test");

test("Öğrenci API'si çalışıyor", async ({ request }) => {
  const response = await request.get("http://localhost:5000/api");
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.message).toBe("School App API");
});