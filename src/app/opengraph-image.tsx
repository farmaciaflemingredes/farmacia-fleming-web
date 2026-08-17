import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = `${site.name} — Farmacia en Salta`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logoPath = join(process.cwd(), "public", "brand", "logo-full.png");
  const logoBase64 = readFileSync(logoPath).toString("base64");
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "70px 80px",
          backgroundColor: "#E7F4E5",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={340} height={254} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 58,
            fontWeight: 900,
            color: "#1B1210",
            lineHeight: 1.1,
            maxWidth: 950,
          }}
        >
          Siempre cerca tuyo
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 30,
            color: "#00841A",
            fontWeight: 700,
          }}
        >
          5 sucursales en Salta Capital y San Lorenzo
        </div>
      </div>
    ),
    { ...size }
  );
}
