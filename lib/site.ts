/**
 * One place for facts that appear all over the site: the address, how to
 * reach BROKA, and where the app comes from. Pages read these instead of
 * repeating them, so a changed phone number or address is a one-line edit.
 */

export const SITE_URL = "https://www.broka.co.ke";
export const SITE_NAME = "BROKA";

/** Public contact details. Shown on the Contact page, the footer and in structured data. */
export const CONTACT = {
  adminEmail: "admin@broka.co.ke",
  /** International format, for tel: links and structured data. */
  phone: "+254706462869",
  /** How the number is written on the page. */
  phoneDisplay: "+254 706 462 869",
  /** wa.me wants digits only, no plus sign. */
  whatsapp: "https://wa.me/254706462869",
  country: "Kenya",
  city: "Nairobi",
} as const;

export const SOCIAL = {
  x: "https://x.com/brokaapp",
  linkedin: "https://linkedin.com/company/brokaapp",
  github: "https://github.com/Xxavier-ml/broka-website",
} as const;

/**
 * The Android app, built by the main BROKA repository's CI and published as
 * the latest GitHub release. Overridable so a Play Store link can replace it
 * without a code change.
 */
export const APP_DOWNLOAD_URL =
  (process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL || "").trim() ||
  "https://github.com/Xxavier-ml/broka/releases/latest/download/broka-release.apk";

export const mailto = (address: string, subject?: string) =>
  `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
