import test, { expect } from "@playwright/test";

test("should test checkbox", async ({ page }) => {
  await page.goto("/generate");
  expect(page.getByLabel("Uppercase")).toBeChecked();
  expect(page.getByLabel("Lowercase")).toBeChecked();
  expect(page.getByLabel("Numbers")).toBeChecked();
  expect(page.getByLabel("Symbols")).toBeChecked();
  await page.locator('label').filter({ hasText: 'Easy to say' }).locator('span').first().click();
  expect(page.getByLabel("Uppercase")).toBeChecked();
  expect(page.getByLabel("Lowercase")).toBeChecked();
  expect(page.getByLabel("Numbers")).not.toBeChecked();
  expect(page.getByLabel("Symbols")).not.toBeChecked();
  expect(page.getByLabel("Numbers")).toBeDisabled();
  expect(page.getByLabel("Symbols")).toBeDisabled();
  await page.locator('label').filter({ hasText: 'Easy to read' }).locator('span').first().click();
  expect(page.getByLabel("Uppercase")).toBeChecked();
  expect(page.getByLabel("Lowercase")).toBeChecked();
  expect(page.getByLabel("Numbers")).not.toBeChecked();
  expect(page.getByLabel("Symbols")).not.toBeChecked();
  await page.locator('label').filter({ hasText: 'All characters' }).locator('span').first().click();
  expect(page.getByLabel("Uppercase")).toBeChecked();
  expect(page.getByLabel("Lowercase")).toBeChecked();
  expect(page.getByLabel("Numbers")).toBeChecked();
  expect(page.getByLabel("Symbols")).toBeChecked();
  await page.locator('label').filter({ hasText: 'Easy to say' }).locator('span').first().click();
});
