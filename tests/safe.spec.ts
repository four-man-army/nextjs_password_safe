import test, { expect } from "@playwright/test";
const dotenv = require("dotenv");
dotenv.config({ path: ".env.test.local" });

test.describe("password list", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.getByLabel("Email").click();
        await page.getByLabel("Email").fill(process.env.EMAIL as string);
        await page.getByLabel("Password").click();
        await page.getByLabel("Password").fill(process.env.PASSWORD as string);
        await page.getByLabel("Password").press("Enter");
        await page.getByRole('main').getByRole('link', { name: 'Password Safe' }).click();
    });
    test("add password", async ({ page }) => {
        await page.getByRole("button", { name: "+ Add" }).click();
        await page.getByRole('textbox').first().click();
        await page.getByRole('textbox').first().fill('test');
        await page.getByRole('textbox').nth(1).click();
        await page.getByRole('textbox').nth(1).fill('test');
        await page.getByRole('textbox').nth(2).click();
        await page.getByRole('textbox').nth(2).fill('test');
        await page.getByRole('button', { name: 'Save' }).click();
    });
})