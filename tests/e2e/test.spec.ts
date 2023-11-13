import test, { expect } from "@playwright/test";

test("should test checkbox", async ({ page }) => {
  await page.goto("/generate");
  expect(page.getByLabel("Uppercase")).toBeChecked();
  expect(page.getByLabel("Lowercase")).toBeChecked();
  expect(page.getByLabel("Numbers")).toBeChecked();
  expect(page.getByLabel("Symbols")).toBeChecked();
  await page.getByRole("radio").first().click();
  expect(page.getByLabel("Uppercase")).toBeChecked();
  expect(page.getByLabel("Lowercase")).toBeChecked();
  expect(page.getByLabel("Numbers")).not.toBeChecked();
  expect(page.getByLabel("Symbols")).not.toBeChecked();
  expect(page.getByLabel("Numbers")).toBeDisabled();
  expect(page.getByLabel("Symbols")).toBeDisabled();
  await page.getByRole("radio").nth(1).click();
  expect(page.getByLabel("Uppercase")).toBeChecked();
  expect(page.getByLabel("Lowercase")).toBeChecked();
  expect(page.getByLabel("Numbers")).not.toBeChecked();
  expect(page.getByLabel("Symbols")).not.toBeChecked();
  await page.getByRole("radio").nth(2).click();
  expect(page.getByLabel("Uppercase")).toBeChecked();
  expect(page.getByLabel("Lowercase")).toBeChecked();
  expect(page.getByLabel("Numbers")).toBeChecked();
  expect(page.getByLabel("Symbols")).toBeChecked();
  await page.getByRole("radio").first().click();
});
