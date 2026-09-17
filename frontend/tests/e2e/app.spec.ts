import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders the starter and supports its primary interaction", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Python + React project template" }),
  ).toBeVisible();

  const button = page.getByRole("button", { name: "Verification count: 0" });
  await button.click();
  await expect(
    page.getByRole("button", { name: "Verification count: 1" }),
  ).toBeVisible();
});

test("has no automatically detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
