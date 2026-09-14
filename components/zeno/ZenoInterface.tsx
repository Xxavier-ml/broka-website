// Illustrative Zeno interface — no live API connection
const messages = [
  { role: "user", text: "Find me a used MacBook under KES 80,000.", delay: "0.4s" },
  { role: "ai", text: "I found 6 sellers with MacBooks matching your budget in Nairobi and Mombasa. Three are verified sellers with positive transaction history. Want me to rank them by price, condition, or proximity?", delay: "1.6s" },
  { role: "user", text: "By condition, and then ask the top seller if they can do 72,000.", delay: "3.2s" },
  { role: "ai", text: "The top-rated seller has a 2020 MacBook Air (M1) listed at KES 78,000, rated 4.9 from 12 transactions. I'm reaching out now with your offer of KES 72,000.", delay: "4.6s" },
  { role: "ai", text: "The seller responded: they can meet at KES 74,500. They're available in Westlands this weekend. Would you like to accept and schedule the meetup?", delay: "6.0s" },
];

const contextItems = [
  { key: "Buyer intent", value: "Used MacBook · Under KES 80,000 · Good condition" },
  { key: "Sellers found", value: "6 matching · 3 verified" },
  { key: "Negotiation status", value: "Counter-offer received: KES 74,500" },
  { key: "Top seller rating", value: "4.9 / 5 · 12 transactions" },
  { key: "Location", value: "Nairobi · Westlands available" },
];

export function ZenoInterface() {
  return (
    <div className="zeno-interface-wrap">
      {/* Title bar */}
      <div className="zeno-interface-bar">
        <div className="zeno-interface-dots">
          <span className="zeno-interface-dot zid-red" />
          <span className="zeno-interface-dot zid-yellow" />
          <span className="zeno-interface-dot zid-green" />
        </div>
        <span className="zeno-interface-title">Zeno · BROKA Commerce Intelligence</span>
        <span className="zeno-interface-status">
          <span className="zeno-status-dot" />
          Active session
        </span>
      </div>

      {/* Body */}
      <div className="zeno-interface-body">
        {/* Chat panel */}
        <div className="zeno-chat-panel">
          <div className="zeno-chat-messages" role="log" aria-label="Zeno conversation">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`zmsg zmsg-${m.role} zmsg-${i + 1}`}
                style={{ animationDelay: m.delay }}
              >
                <div className="zmsg-bubble">{m.text}</div>
              </div>
            ))}
          </div>
          <div className="zeno-chat-input" aria-hidden="true">
            <div className="zeno-chat-input-field">
              Type a message to Zeno…
            </div>
          </div>
        </div>

        {/* Context panel */}
        <div className="zeno-context-panel" aria-label="Zeno context panel">
          <p className="zeno-ctx-title">Zeno context</p>
          {contextItems.map((item) => (
            <div className="zeno-ctx-item" key={item.key}>
              <div className="zeno-ctx-key">{item.key}</div>
              <div className="zeno-ctx-value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="zeno-label" role="note">
        Illustrative example — not a live Zeno session
      </p>
    </div>
  );
}
