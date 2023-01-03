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
    expect(page.locator(".ant-input-suffix").last()).not.toBeNull();
  });

  test("test invalid email", async ({ page }: { page: Page }) => {
    expect(page.locator(".ant-input-suffix").first()).not.toBeNull();
  });
});

test.describe("Signin error", () => { 
  test("test error", async ({ page }: { page: Page }) => { 
    await page.goto("/"); 
    await page.getByRole("button", { name: "Submit" }).click();
    expect(page.locator(".ant-form-item-explain").first()).not.toBeNull();
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
    expect(page.getByRole("button", { name: /Sign out/ })).not.toBeNull();
  });
});
