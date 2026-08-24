import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const alt = "Jakub Perďoch — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const AVATAR_SIZE = 320;

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
        padding: "80px",
        background: "linear-gradient(115deg, #072C2B 0%, #114C4B 55%, #00856C 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#81F8E2",
            marginBottom: 24,
          }}
        >
          Software Developer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.1,
          }}
        >
          Jakub Perďoch
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#E3FCF7",
            marginTop: 28,
            lineHeight: 1.4,
          }}
        >
          Building fast, well-crafted web experiences with React, Next.js and TypeScript.
        </div>
      </div>

      <img
        src={avatarSrc}
        alt=""
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          border: "6px solid #00C29E",
        }}
      />
    </div>,
    { ...size }
  );
}
