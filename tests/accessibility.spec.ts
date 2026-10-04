import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { name: "home", path: "/" },
  { name: "browse", path: "/browse" },
  { name: "auctions", path: "/auctions" },
  { name: "contact", path: "/contact" },
  { name: "Zeno", path: "/zeno" },
  { name: "listing detail", path: "/listings/fbea38cd-1c50-45e9-a637-f7b86e36b4b2" },
];

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 900 },
];

for (const route of routes) {
  for (const viewport of viewports) {
    test(`${route.name} has no axe violations at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(route.path, { waitUntil: "domcontentloaded" });

      expect(response?.status(), `${route.path} should respond successfully`).toBe(200);
      await expect(page.locator("#main")).toBeVisible();
      await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => undefined);

      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
        .analyze();

      expect(
        violations.map(({ id, impact, help, nodes }) => ({
          id,
          impact,
          help,
          affected: nodes.map(({ target }) => target),
        })),
      ).toEqual([]);
    });
  }
}

test("search combobox exposes an operable listbox and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/browse", { waitUntil: "domcontentloaded" });

  const combobox = page.getByRole("combobox").first();
  await expect(combobox).toBeVisible();
  await combobox.focus();
  await expect(combobox).toHaveAttribute("aria-expanded", "true");

  const controlsId = await combobox.getAttribute("aria-controls");
  expect(controlsId).toBeTruthy();
  const listbox = page.getByRole("listbox").first();
  await expect(listbox).toBeVisible();
  expect(await listbox.getAttribute("id")).toBe(controlsId);

  if (await page.getByRole("option").count()) {
    await combobox.press("ArrowDown");
    const activeId = await combobox.getAttribute("aria-activedescendant");
    expect(activeId).toBeTruthy();
    const activeOption = await page.evaluate((id) => {
      const element = id ? document.getElementById(id) : null;
      return element?.getAttribute("aria-selected");
    }, activeId);
    expect(activeOption).toBe("true");
  }

  await combobox.press("Escape");
  await expect(combobox).toHaveAttribute("aria-expanded", "false");
});

test("mobile Browse controls provide 44px hit areas at phone and tablet widths", async ({ page }) => {
  for (const width of [375, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/browse", { waitUntil: "domcontentloaded" });

    for (const selector of [
      ".hdr-search",
      ".hdr-burger",
      ".browse-category-rail .chip",
      ".category-ticker-group .chip",
      ".sform-search-submit",
    ]) {
      const target = page.locator(selector).first();
      await expect(target, `${selector} should exist at ${width}px`).toBeVisible();
      const box = await target.boundingBox();
      expect(box, `${selector} should have a measurable box`).not.toBeNull();
      expect(box!.width, `${selector} width at ${width}px`).toBeGreaterThanOrEqual(44);
      expect(box!.height, `${selector} height at ${width}px`).toBeGreaterThanOrEqual(44);
    }
  }
});

test("contact enquiry category choices retain button and pressed-state semantics", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  const group = page.getByRole("group", { name: "Enquiry category" });
  const choices = group.getByRole("button");
  await expect(choices.first()).toBeVisible();
  await choices.nth(1).click();
  await expect(choices.nth(1)).toHaveAttribute("aria-pressed", "true");
});
