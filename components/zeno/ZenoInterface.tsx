// Illustrative Zeno interface — no live API connection
const messages = [
  { role: "user", text: "Find me a used MacBook under KES 80,000 in Nairobi.", delay: "0.4s" },
  { role: "ai", text: "Here are sample listings to compare by price, condition, location and seller details. Want a side-by-side summary?", delay: "1.6s" },
  { role: "user", text: "Compare the condition and location.", delay: "3.2s" },
  { role: "ai", text: "This example listing is shown as good condition in Westlands. Review the seller-provided details, then decide whether to contact them directly.", delay: "4.6s" },
];

const contextItems = [
  { key: "Search", value: "Used MacBook · Under KES 80,000 · Nairobi" },
  { key: "Compare", value: "Price · condition · location" },
  { key: "Listing details", value: "Seller-provided" },
  { key: "Next step", value: "Contact the seller directly" },
  { key: "BROKA role", value: "Discovery and context" },
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
        <span className="zeno-interface-title">Zeno · Search Context Demo</span>
        <span className="zeno-interface-status">
          <span className="zeno-status-dot" />
          Example
        </span>
      </div>

      {/* Body */}
      <div className="zeno-interface-body">
        {/* Chat panel */}
        <div className="zeno-chat-panel">
          <div className="zeno-chat-messages" role="log" aria-label="Illustrative Zeno conversation">
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
        <div className="zeno-context-panel" aria-label="Marketplace search context">
          <p className="zeno-ctx-title">Search context</p>
          {contextItems.map((item) => (
            <div className="zeno-ctx-item" key={item.key}>
              <div className="zeno-ctx-key">{item.key}</div>
              <div className="zeno-ctx-value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="zeno-label" role="note">
        Illustrative example — sample listings and simulated responses, not connected to live listings. BROKA does not process buyer-seller payments.
      </p>
    </div>
  );
}
