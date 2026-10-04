"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Listing = {
  name: string;
  price: number;
  condition: string;
  seller: string;
  location: string;
  rating: string;
};

type Category = {
  keywords: string[];
  label: string;
  listings: Listing[];
};

/**
 * Canned catalogue. This is illustrative sample data, not the live BROKA
 * marketplace — the UI labels it as such in two places.
 */
const CATEGORIES: Category[] = [
  {
    keywords: ["phone", "smartphone", "iphone", "samsung", "android", "mobile"],
    label: "Phone",
    listings: [
      { name: "Samsung Galaxy A24", price: 21500, condition: "Used · Excellent", seller: "Mwangi Electronics", location: "Nairobi CBD", rating: "4.8" },
      { name: "iPhone 11 64GB", price: 24900, condition: "Used · Good", seller: "TechHub Westlands", location: "Westlands", rating: "4.6" },
      { name: "Tecno Camon 20", price: 18000, condition: "New · Sealed", seller: "Digital Corner", location: "Kisumu", rating: "4.9" },
    ],
  },
  {
    keywords: ["tv", "television", "screen", "smart tv"],
    label: "TV",
    listings: [
      { name: 'Hisense 55" 4K Smart TV', price: 46500, condition: "New · Sealed", seller: "Bora Home", location: "Nairobi CBD", rating: "4.7" },
      { name: 'TCL 55" QLED', price: 49900, condition: "New · Sealed", seller: "Sunrise Electronics", location: "Mombasa", rating: "4.5" },
      { name: 'Samsung 50" Crystal UHD', price: 42000, condition: "Used · Excellent", seller: "Mwangi Electronics", location: "Nakuru", rating: "4.8" },
    ],
  },
  {
    keywords: ["laptop", "macbook", "notebook", "computer", "pc"],
    label: "Laptop",
    listings: [
      { name: "HP EliteBook 840 G6", price: 38000, condition: "Used · Excellent", seller: "LapZone", location: "Nairobi CBD", rating: "4.7" },
      { name: "Dell Latitude 7400", price: 34500, condition: "Used · Good", seller: "TechHub Westlands", location: "Westlands", rating: "4.6" },
      { name: "Lenovo ThinkPad T490", price: 41000, condition: "Used · Excellent", seller: "Digital Corner", location: "Eldoret", rating: "4.9" },
    ],
  },
  {
    keywords: ["fridge", "refrigerator", "freezer", "cooker", "microwave"],
    label: "Appliance",
    listings: [
      { name: "Ramtons 200L Fridge", price: 32000, condition: "New · Sealed", seller: "Bora Home", location: "Nairobi CBD", rating: "4.6" },
      { name: "Von Hotpoint 128L", price: 24500, condition: "Used · Good", seller: "Home Essentials", location: "Thika", rating: "4.4" },
      { name: "Mika 4-Burner Cooker", price: 28900, condition: "New · Sealed", seller: "Sunrise Electronics", location: "Mombasa", rating: "4.5" },
    ],
  },
];

const EXAMPLES = [
  "I need a 55-inch TV under KSh 50,000",
  "Find me a good phone under 25,000",
  "Laptop for work, budget 40,000",
];

const fmt = (n: number) => `KSh ${n.toLocaleString("en-KE")}`;

function parse(query: string) {
  const q = query.toLowerCase();

  const category =
    CATEGORIES.find((c) => c.keywords.some((k) => q.includes(k))) ?? null;

  // Pull the largest number that looks like a budget, tolerating
  // "50,000" / "50000" / "50k".
  let budget: number | null = null;
  const kMatch = q.match(/(\d+(?:\.\d+)?)\s*k\b/);
  if (kMatch) budget = Math.round(parseFloat(kMatch[1]) * 1000);
  if (budget === null) {
    const nums = q.replace(/,/g, "").match(/\d{4,}/g);
    if (nums) budget = Math.max(...nums.map(Number));
  }

  const sizeMatch = q.match(/(\d{2})\s*(?:-|\s)?inch|(\d{2})"/);
  const size = sizeMatch ? sizeMatch[1] ?? sizeMatch[2] : null;

  const location =
    ["nairobi", "mombasa", "kisumu", "nakuru", "eldoret", "thika", "westlands"].find(
      (l) => q.includes(l)
    ) ?? null;

  return { category, budget, size, location };
}

export function ZenoDemo() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof parse> | null>(null);
  const [thinking, setThinking] = useState(false);

  const run = (query: string) => {
    const q = query.trim();
    if (!q) return;
    setInput(q);
    setThinking(true);
    setResult(null);
    // Brief delay so the interpretation step is legible rather than instant.
    window.setTimeout(() => {
      setResult(parse(q));
      setThinking(false);
    }, 650);
  };

  const listings = result?.category
    ? result.category.listings
        .filter((l) => (result.budget ? l.price <= result.budget : true))
        .slice(0, 3)
    : [];

  const chips: { k: string; v: string }[] = [];
  if (result) {
    if (result.category) chips.push({ k: "Product", v: result.category.label });
    if (result.size) chips.push({ k: "Size", v: `${result.size}"` });
    if (result.budget) chips.push({ k: "Budget", v: `under ${fmt(result.budget)}` });
    if (result.location) {
      chips.push({
        k: "Location",
        v: result.location.replace(/^\w/, (c) => c.toUpperCase()),
      });
    }
  }

  return (
    <div className="zdemo">
      <div className="zdemo-head">
        <div className="zdemo-avatar">Z</div>
        <div>
          <div className="zdemo-name">Zeno</div>
          <div className="zdemo-status">Interactive demo · simulated data</div>
        </div>
      </div>

      <div className="zdemo-body">
        <label className="zdemo-label" htmlFor="zdemo-input">
          Tell Zeno what you&apos;re looking for
        </label>
        <div className="zdemo-inputrow">
          <input
            id="zdemo-input"
            className="zdemo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") run(input);
            }}
            placeholder="I need a 55-inch TV under KSh 50,000"
          />
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => run(input)}
            disabled={!input.trim() || thinking}
          >
            Ask
          </button>
        </div>

        <div className="zdemo-examples">
          {EXAMPLES.map((ex) => (
            <button key={ex} type="button" className="zdemo-chip-btn" onClick={() => run(ex)}>
              {ex}
            </button>
          ))}
        </div>

        <div className="zdemo-output" aria-live="polite">
          <AnimatePresence mode="wait">
            {thinking && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="zdemo-thinking"
              >
                Reading your request…
              </motion.div>
            )}

            {result && !thinking && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {chips.length > 0 && (
                  <>
                    <div className="zdemo-section-label">Zeno understood</div>
                    <div className="zdemo-chips">
                      {chips.map((c, i) => (
                        <motion.span
                          key={c.k}
                          className="zdemo-chip"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07 }}
                        >
                          <span className="zdemo-chip-k">{c.k}</span>
                          {c.v}
                        </motion.span>
                      ))}
                    </div>
                  </>
                )}

                {listings.length > 0 ? (
                  <>
                    <div className="zdemo-section-label">
                      {listings.length} matching {listings.length === 1 ? "listing" : "listings"}
                    </div>
                    <div className="zdemo-listings">
                      {listings.map((l, i) => (
                        <motion.div
                          key={l.name}
                          className="zdemo-listing"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.09 }}
                        >
                          <div className="zdemo-listing-top">
                            <span className="zdemo-listing-name">{l.name}</span>
                            <span className="zdemo-listing-price">{fmt(l.price)}</span>
                          </div>
                          <div className="zdemo-listing-meta">
                            {l.condition} · {l.seller} · {l.location} · ★ {l.rating}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      className="zdemo-next"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.55 }}
                    >
                      Next, Zeno would open a negotiation with the seller on your
                      behalf — framing your offer with comparable prices as context.
                    </motion.div>
                  </>
                ) : (
                  <div className="zdemo-empty">
                    {result.category
                      ? `Nothing in this sample set under ${result.budget ? fmt(result.budget) : "that budget"}. Try a higher budget.`
                      : "This demo covers phones, TVs, laptops and home appliances. Try one of those."}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="zdemo-foot">
        Demo only — sample listings, not connected to the live BROKA platform.
      </div>
    </div>
  );
}
