// src/lib/richText.ts

export function richTextToPlainText(blocks: any[]): string {
  let out = ''
  for (const block of blocks) {
    if (Array.isArray(block.children)) {
      out += richTextToPlainText(block.children)
    } else if (typeof block.text === 'string') {
      out += block.text
    }
  }
  return out.replace(/\s+/g, ' ').trim()
}
