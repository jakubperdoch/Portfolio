'use client'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

type Props = {
  svg?: string | null
  className?: string
  size?: number
  color?: string
}

export default function SafeSVG({ svg, className, size = 20, color }: Props) {
  const [resolvedColor, setResolvedColor] = useState<string | undefined>()

  useEffect(() => {
    if (!color) return setResolvedColor(undefined)

    const varMatch = color.match(/^var\((--[\da-z\-]+)\)\s*$/i)
    if (varMatch) {
      const prop = varMatch[1] || 'var(--main-1)'
      const raw = getComputedStyle(document.documentElement).getPropertyValue(prop).trim()
      setResolvedColor(raw ? `hsl(${raw})` : undefined)
    } else {
      setResolvedColor(color)
    }
  }, [color])

  const dataUrl = useMemo(() => {
    if (!svg) return null
    const s = svg.trim()
    const colored = resolvedColor ? s.replaceAll('currentColor', resolvedColor) : s
    return `data:image/svg+xml;utf8,${encodeURIComponent(colored)}`
  }, [svg, resolvedColor])

  if (!dataUrl) return null

  return (
    <Image
      src={dataUrl}
      alt="icon"
      width={size}
      height={size}
      className={className}
      loading="lazy"
      unoptimized
    />
  )
}
