import { ImageResponse } from "next/og";
import { siteConfig } from "@/constants/siteConfig";

export const runtime = "edge";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#0A0A0A",
          padding: 64,
        }}
      >
        <div style={{ color: "#C9A86C", fontSize: 32, letterSpacing: 2 }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            color: "#F5F5F0",
            fontSize: 64,
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          Product Engineer & Designer
        </div>
        <div style={{ color: "#8A8A85", fontSize: 24, marginTop: 12 }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
