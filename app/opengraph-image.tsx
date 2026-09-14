import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BROKA — The Intelligence Layer for Commerce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050507",
          backgroundImage:
            "radial-gradient(circle at 50% 38%, rgba(107,86,255,0.35) 0%, rgba(107,86,255,0) 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#6B56FF",
              boxShadow: "0 0 40px 10px rgba(107,86,255,0.7)",
            }}
          />
          <span
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: "#C4BAFF",
              textTransform: "uppercase",
            }}
          >
            Broka
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            color: "#EDE8FF",
            letterSpacing: -2,
            textAlign: "center",
            lineHeight: 1.08,
          }}
        >
          The intelligence layer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            color: "#EDE8FF",
            letterSpacing: -2,
            marginBottom: 34,
          }}
        >
          for commerce.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#B0A8CA",
          }}
        >
          Built in Kenya. Designed for a global market.
        </div>
      </div>
    ),
    { ...size }
  );
}
