import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared OG card: warm paper, two-tone headline, lime signal dot. */
export function renderOg({ eyebrow, lead, title, footer }: { eyebrow: string; lead?: string; title: string; footer: string }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#fafaf9",
        color: "#1c1917",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#667085" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, letterSpacing: -1, color: "#12213f" }}>
          edishan
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "#84cc16", margin: "6px 7px 0" }} />
          <span style={{ color: "#98a2b3" }}>lee</span>
        </div>
        <div style={{ display: "flex", textTransform: "uppercase", letterSpacing: 3 }}>{eyebrow}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 72, lineHeight: 1.05, letterSpacing: -3, maxWidth: 1000 }}>
        {lead ? <span style={{ color: "#98a2b3" }}>{lead}</span> : null}
        <span>{title}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#4a5468" }}>
        <div style={{ width: 12, height: 12, borderRadius: 12, background: "#84cc16" }} />
        {footer}
      </div>
    </div>,
    ogSize,
  );
}
