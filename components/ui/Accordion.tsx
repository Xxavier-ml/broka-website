"use client";
import { useState } from "react";

interface AccordionItem { id: string; question: string; answer: string }

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen((p) => (p === id ? null : id));
  return (
    <div className="faq-list" role="list">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div className="faq-item" key={item.id} role="listitem">
            <button
              className="faq-btn"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`fa-${item.id}`}
              id={`fq-${item.id}`}
            >
              {item.question}
              <span className="faq-icon" aria-hidden="true">+</span>
            </button>
            <div
              id={`fa-${item.id}`}
              className={`faq-answer-wrap${isOpen ? " open" : ""}`}
              role="region"
              aria-labelledby={`fq-${item.id}`}
            >
              <div className="faq-answer-inner">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
