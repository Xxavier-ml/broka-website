"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { title: "General enquiry", sub: "Questions about BROKA, Zeno or the platform." },
  { title: "Partnership", sub: "Businesses, distributors or integration partners." },
  { title: "Investor", sub: "Investment conversations and due diligence." },
  { title: "Media", sub: "Press, editorial and research enquiries." },
  { title: "Early access", sub: "Interested in using BROKA before public launch." },
  { title: "Technical", sub: "Engineers, researchers and API enquiries." },
] as const;

const CONTACT_EMAIL = "hello@broka.co.ke";

export function EarlyAccessPanel() {
  const [selected, setSelected] = useState<string>(CATEGORIES[4].title);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [touched, setTouched] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSend = name.trim().length > 1 && emailValid;

  const buildMailto = () => {
    const subject = `BROKA — ${selected}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Category: ${selected}`,
      "",
      note || "(no additional message)",
    ].join("\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSend) return;
    window.location.href = buildMailto();
  };

  return (
    <div className="contact-grid">
      {/* Left: intent categories — real, keyboard-usable controls */}
      <div className="contact-info">
        <h2 className="t-h3" id="contact-h" style={{ marginBottom: 14 }}>
          What are you reaching out about?
        </h2>
        <p>
          Choose the category that best fits — it&apos;s included in your
          message so we can route it to the right person.
        </p>
        <div className="contact-categories" role="list">
          {CATEGORIES.map((c) => (
            <button
              type="button"
              key={c.title}
              role="listitem"
              className={cn("contact-cat", selected === c.title && "selected")}
              aria-pressed={selected === c.title}
              onClick={() => setSelected(c.title)}
            >
              <div className="contact-cat-title">{c.title}</div>
              <div className="contact-cat-sub">{c.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: a real, honest form — no backend yet, so it hands off to email
         rather than pretending a submission was stored anywhere. */}
      <form className="contact-form-placeholder" onSubmit={handleSubmit} noValidate>
        <p style={{ fontSize: 32, marginBottom: 16 }}>📬</p>
        <h3 style={{ marginBottom: 8 }}>Get in touch</h3>
        <p style={{ marginBottom: 24 }}>
          We don&apos;t have a ticketing system live yet, so sending this
          opens a pre-filled email straight to the team — nothing is stored
          on this site.
        </p>

        <label style={{ display: "block", textAlign: "left", marginBottom: 12 }}>
          <span style={{ display: "block", fontSize: 13, color: "var(--c-text-2)", marginBottom: 4 }}>
            Name
          </span>
          <input
            className="contact-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>

        <label style={{ display: "block", textAlign: "left", marginBottom: 12 }}>
          <span style={{ display: "block", fontSize: 13, color: "var(--c-text-2)", marginBottom: 4 }}>
            Email
          </span>
          <input
            type="email"
            className="contact-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

        <label style={{ display: "block", textAlign: "left", marginBottom: 16 }}>
          <span style={{ display: "block", fontSize: 13, color: "var(--c-text-2)", marginBottom: 4 }}>
            Message (optional)
          </span>
          <textarea
            className="contact-input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={`Tell us a bit about your ${selected.toLowerCase()}…`}
            rows={3}
          />
        </label>

        {touched && !canSend && (
          <p role="alert" style={{ fontSize: 13, color: "#E5876A", marginBottom: 12 }}>
            Add your name and a valid email so we know how to reach you.
          </p>
        )}

        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
          Email the team →
        </button>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 24,
          }}
        >
          <a href="https://x.com/brokaapp" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            X / Twitter
          </a>
          <a href="https://linkedin.com/company/brokaapp" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            LinkedIn
          </a>
          <a href="https://github.com/Xxavier-ml/broka-website" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            GitHub
          </a>
        </div>
      </form>
    </div>
  );
}
