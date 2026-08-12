export const hasRichTextContent = (value: any) => {
  if (!value) return false
  const children = value?.root?.children
  if (!Array.isArray(children)) return false
  return children.some((node) => {
    if (node.type === 'text' && node.text?.trim()) return true
    if (Array.isArray(node.children))
      return node.children.some((child: { text: string }) => child.text?.trim())
    return false
  })
}
