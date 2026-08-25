import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const alt = "Jakub Perďoch — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const AVATAR_SIZE = 360;

export default async function Image() {
  const source = await readFile(join(process.cwd(), "public/images/profile-picture.png"));
  const avatar = await sharp(source)
    .resize(AVATAR_SIZE * 2, AVATAR_SIZE * 2, { fit: "cover" })
    .png()
    .toBuffer();
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "96px",
        background: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "#09090b",
              color: "#fafafa",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            JP
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#71717a",
            }}
          >
            Software Developer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 700,
            color: "#09090b",
            lineHeight: 1.05,
            letterSpacing: "-2px",
          }}
        >
          Jakub Perďoch
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#71717a",
            marginTop: 28,
            lineHeight: 1.5,
          }}
        >
          Building fast, well-crafted web experiences with React, Next.js and TypeScript.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#a1a1aa",
            marginTop: 44,
          }}
        >
          perdochjakub.com
        </div>
      </div>

      <img
        src={avatarSrc}
        alt=""
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        style={{
          borderRadius: 48,
          objectFit: "cover",
          border: "1px solid #e4e4e7",
        }}
      />
    </div>,
    { ...size }
  );
}
