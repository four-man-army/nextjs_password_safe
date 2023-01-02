import { test, expect, type Page } from "@playwright/test";
const dotenv = require("dotenv");
dotenv.config({ path: ".env.test.local" });

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
  test("test success", async ({ page }: { page: Page }) => {
    await page.goto("/");
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill(process.env.EMAIL as string);
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill(process.env.PASSWORD as string);
    await page.getByLabel("Password").press("Enter");
    await expect.poll(async () => {
      return page.getByRole("button", { name: /Sign out/ });
    }, {
      intervals: [1_000, 2_000, 10_000],
      timeout: 20_000,
    }).not.toBeNull();
  });
});
