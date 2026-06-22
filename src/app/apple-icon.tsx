import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2f5e43",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64" fill="#f4d58a">
          <ellipse cx="20" cy="27" rx="4.2" ry="5.6" transform="rotate(-12 20 27)" />
          <ellipse cx="28.5" cy="22" rx="4.4" ry="6" transform="rotate(-4 28.5 22)" />
          <ellipse cx="37" cy="22" rx="4.4" ry="6" transform="rotate(4 37 22)" />
          <ellipse cx="45" cy="27" rx="4.2" ry="5.6" transform="rotate(12 45 27)" />
          <path d="M32 30c6.2 0 11 4.2 11 9.6 0 4.6-3.8 7-8.4 7-1.4 0-2-.5-2.6-.5s-1.2.5-2.6.5c-4.6 0-8.4-2.4-8.4-7C21 34.2 25.8 30 32 30z" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
