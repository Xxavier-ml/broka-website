import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { name: "home", path: "/" },
  { name: "browse", path: "/browse" },
  { name: "stores", path: "/stores" },
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

test("legacy marketplace URLs open the current marketplace", async ({ page }) => {
  await page.goto("/auctions", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/browse(?:\?.*)?$/);
  await expect(page.locator("#main")).toBeVisible();
});

test("homepage shows category artwork instead of live product cards", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".home-discovery-card")).toHaveCount(3);
  await expect(page.locator(".lcard-product")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Explore Electronics in the marketplace" }))
    .toHaveAttribute("href", "/browse/electronics");
  await expect(page.getByRole("link", { name: "Explore Fashion in the marketplace" }))
    .toHaveAttribute("href", "/browse/fashion");
  await expect(page.getByRole("link", { name: "Explore Home & Furniture in the marketplace" }))
    .toHaveAttribute("href", "/browse/home-and-furniture");
});

test("mobile marketplace category artwork uses moderate landscape cards", async ({ page }) => {
  const viewportWidth = 375;
  await page.setViewportSize({ width: viewportWidth, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/browse", { waitUntil: "domcontentloaded" });

  const card = page.locator(".browse-category-rail .category-card").nth(1);
  await expect(card).toBeVisible();
  const box = await card.boundingBox();
  expect(box, "category card should have a measurable box").not.toBeNull();
  expect(box!.width, "category artwork card should remain large enough to browse").toBeGreaterThan(viewportWidth * 0.72);
  expect(box!.width, "category artwork card should leave a visible neighboring-card peek").toBeLessThan(viewportWidth * 0.85);
  expect(box!.height, "category artwork card should keep a comfortable landscape height").toBeGreaterThan(160);
  expect(box!.height, "category artwork card should avoid dominating the viewport").toBeLessThan(210);
  expect(box!.width / box!.height, "category artwork card should be clearly rectangular").toBeGreaterThan(1.4);

  const previous = await page.locator(".category-card-nav-prev").boundingBox();
  const next = await page.locator(".category-card-nav-next").boundingBox();
  const visibleCard = page.locator(".browse-category-rail .category-card").first();
  const icon = await visibleCard.locator(".category-card-icon").boundingBox();
  const label = await visibleCard.locator(".category-card-name").boundingBox();
  expect(previous, "previous arrow should have a measurable box").not.toBeNull();
  expect(next, "next arrow should have a measurable box").not.toBeNull();
  expect(icon, "category icon should have a measurable box").not.toBeNull();
  expect(label, "category label should have a measurable box").not.toBeNull();
  const overlaps = (a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }) =>
    a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  for (const arrow of [previous!, next!]) {
    expect(overlaps(arrow, icon!), "carousel arrows should not cover the category icon").toBe(false);
    expect(overlaps(arrow, label!), "carousel arrows should not cover the category label").toBe(false);
  }
});

test("homepage marketplace visual presents a direct Discover–Compare–Connect flow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const panel = page.locator(".cn-trust-visual");
  await expect(panel).toBeVisible();
  await expect(panel.locator(".cn-market-copy h3")).toHaveText("Find your next move.");
  await expect(panel.locator(".cn-market-flow li")).toHaveCount(3);
  await expect(panel.locator(".cn-market-flow strong")).toHaveText([
    "Discover",
    "Compare",
    "Connect",
  ]);
  await expect(panel).toContainText("SALE & PAYMENT ARRANGED DIRECTLY");
  await expect(panel).not.toContainText(/escrow|m-pesa/i);

  const pageWidth = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(pageWidth.content, "trust card should not cause horizontal page scrolling").toBeLessThanOrEqual(pageWidth.viewport);
});

test("homepage closing call to action offers clear buyer and seller routes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const section = page.getByRole("region", { name: "Make your next deal a clearer one." });
  await expect(section.getByRole("link", { name: /Explore the marketplace/ })).toHaveAttribute("href", "/browse");
  await expect(section.getByRole("link", { name: /Create a listing/ })).toHaveAttribute("href", "/sell");
  await expect(section.getByRole("link", { name: /Read the FAQ/ })).toHaveAttribute("href", "/faq");
  const pageWidth = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  expect(pageWidth.content, "closing CTA should not cause horizontal scrolling on a phone").toBeLessThanOrEqual(pageWidth.viewport);
});

test("desktop navigation dropdown opens by keyboard and Escape restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => undefined);
  await page.waitForTimeout(250);
  const trigger = page.getByRole("link", { name: "Marketplace", exact: true });
  const menu = page.locator("#nav-marketplace-links");
  await trigger.focus();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(menu.getByRole("link", { name: /Browse all products/ })).toBeVisible();
  await trigger.press("ArrowDown");
  await expect(menu.getByRole("link", { name: /Browse all products/ })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("mobile navigation opens, routes, and closes after selection", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => undefined);
  const openButton = page.getByRole("button", { name: "Open menu" });
  await openButton.click();
  const mobileNav = page.locator("#mobile-nav");
  await expect(mobileNav).toHaveAttribute("aria-hidden", "false");
  await mobileNav.getByRole("link", { name: /Browse all products/ }).click();
  await expect(page).toHaveURL(/\/browse(?:\?.*)?$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  await expect(mobileNav).toHaveAttribute("aria-hidden", "true");
});

test("homepage seller showcase presents a sample listing and direct-contact path", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const section = page.locator(".cn-seller");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await expect(section.getByRole("heading", { name: "Make your listings easy to understand." })).toBeVisible();
  const preview = section.locator(".cn-seller-poster");
  await expect(preview).toContainText("SAMPLE PREVIEW");
  await expect(preview).toContainText("Contact seller");
  await expect(preview).toContainText("Clear photos");
  await expect(preview).not.toContainText(/escrow|m-pesa|checkout|buy now/i);
  await expect(section.getByRole("link", { name: /Create a listing/ })).toHaveAttribute("href", "/sell");

  const artwork = await preview.locator(".cn-seller-feature").evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(artwork).toContain("arts-crafts-1024.webp");
  const pageWidth = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  expect(pageWidth.content, "seller showcase should not cause horizontal page scrolling").toBeLessThanOrEqual(pageWidth.viewport);
});

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
