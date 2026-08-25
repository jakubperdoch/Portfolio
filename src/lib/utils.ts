import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const shimmer = (width: number, height: number) => `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e4e4e7" offset="20%" />
      <stop stop-color="#f4f4f5" offset="50%" />
      <stop stop-color="#e4e4e7" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#e4e4e7" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1.2s" repeatCount="indefinite" />
</svg>`

const toBase64 = (str: string) =>
    typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str)

export function shimmerBlurDataURL(width: number, height: number) {
    return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
}

