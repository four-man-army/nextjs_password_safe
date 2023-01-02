import { test, expect, type Page } from "@playwright/test";

test.describe("Signin failed", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto("/");
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("test@mail.test");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("testPassword1!");
    await page.getByLabel("Password").press("Enter");
  });

  test("test invalid password", async ({ page }: { page: Page }) => {
    await expect
      .poll(
        async () => {
          return page.locator(".ant-input-suffix").last();
        },
        {
          intervals: [1_000, 2_000, 10_000],
          timeout: 20_000,
        }
      )
      .not.toBeNull();
  });

  test("test invalid email", async ({ page }: { page: Page }) => {
    await expect
      .poll(
        async () => {
          return page.locator(".ant-input-suffix").first();
        },
        {
          intervals: [1_000, 2_000, 10_000],
          timeout: 20_000,
        }
      )
      .not.toBeNull();
  });
});

test.describe("Signin success", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.route("**/api/auth/session", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: { name: "oliver", email: "test@mail.com" },
          expires: "2024-01-01T17:02:17.171Z",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  });

  test("test success", async ({ page }: { page: Page }) => {
    await page.goto("/");
    await expect.poll(async () => {
      return page.url();
    }).toBe("http://localhost:3000/");
  });
});
