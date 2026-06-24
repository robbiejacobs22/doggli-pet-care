import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — Dog Boarding, Daycare & Walking in El Sobrante`;

export default function OgImage() {
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
          background:
            "radial-gradient(1100px 600px at 85% -10%, #f3e6c4, transparent), #fbf8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#2f5e43",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f4d58a",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#1f3a2b" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#1f3a2b",
              maxWidth: 900,
            }}
          >
            Give your dog the best day, every day.
          </div>
          <div style={{ fontSize: 32, color: "#5b5040", maxWidth: 820 }}>
            Boutique boarding, daycare &amp; walking in El Sobrante &amp; the East Bay.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#fff",
              border: "1px solid #e7decb",
              borderRadius: 999,
              padding: "14px 26px",
              fontSize: 28,
              color: "#1f3a2b",
              fontWeight: 600,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#e3a13a">
              <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 21.4l1.4-6.8L2.2 9.9l6.9-.8L12 2z" />
            </svg>
            {site.rating.value.toFixed(1)} rating
          </div>
          <div style={{ fontSize: 28, color: "#5b5040" }}>120+ happy dogs</div>
          <div style={{ fontSize: 28, color: "#5b5040" }}>{site.phone}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
