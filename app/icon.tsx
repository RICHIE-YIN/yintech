import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon drawn from the mark's geometry — three slanted bars — rather than
 * the starter template's placeholder.
 */
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
          background: "#0a0b0d",
        }}
      >
        <svg fill="none" height="44" viewBox="0 0 120 180" width="30">
          <path d="M2 52 L74 10 L74 44 L2 86 Z" fill="#dfe6f2" />
          <path d="M2 98 L112 44 L112 78 L2 132 Z" fill="#2f7df6" />
          <path d="M40 146 L112 104 L112 138 L40 180 Z" fill="#4a91ff" />
        </svg>
      </div>
    ),
    size,
  );
}
