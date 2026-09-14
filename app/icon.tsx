import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050507",
          borderRadius: 7,
        }}
      >
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: 20,
            fontWeight: 800,
            color: "#9B8AFF",
          }}
        >
          B
        </span>
      </div>
    ),
    { ...size }
  );
}
