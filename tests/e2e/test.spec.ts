import test, { expect } from "@playwright/test";

test("should generate a password", async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Password Genrator' }).click();
    await page.getByRole('radio').first().click();
    await page.getByRole('radio').nth(1).click();
    await page.getByRole('radio').nth(2).click();
});