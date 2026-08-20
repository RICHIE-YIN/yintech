import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "YinTech Solutions — AI automation and business systems";

/** Link previews: a bare text card is the default without this. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0a0b0d 0%, #12161d 60%, #0d1522 100%)",
          color: "#edf0f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg fill="none" height="64" viewBox="0 0 120 180" width="44">
            <path d="M2 52 L74 10 L74 44 L2 86 Z" fill="#dfe6f2" />
            <path d="M2 98 L112 44 L112 78 L2 132 Z" fill="#2f7df6" />
            <path d="M40 146 L112 104 L112 138 L40 180 Z" fill="#4a91ff" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: -0.5 }}>
            YinTech Solutions
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.04,
              letterSpacing: -2.4,
              maxWidth: 900,
            }}
          >
            See your operation as a system.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              color: "#98a2b0",
              maxWidth: 820,
            }}
          >
            AI automation, CRM, and custom business systems built around the way
            your company already works.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ display: "flex", width: 46, height: 3, background: "#2f7df6" }} />
          <div style={{ display: "flex", fontSize: 22, color: "#6d7784" }}>
            Lead capture · Qualification · CRM · Follow-up · Reporting
          </div>
        </div>
      </div>
    ),
    size,
  );
}
