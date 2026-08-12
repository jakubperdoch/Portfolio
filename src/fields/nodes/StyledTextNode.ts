import {
  TextNode,
  type EditorConfig,
  type NodeKey,
  type SerializedTextNode,
  type Spread,
} from 'lexical'

export type SerializedStyledTextNode = Spread<
  {
    type: 'styled-text'
    version: 1
    style: string
  },
  SerializedTextNode
>

function getStyleValue(style: string | null | undefined, key: string): string | null {
  if (!style) return null
  const m = new RegExp(`(?:^|;)\\s*${key}\\s*:\\s*([^;]+)`, 'i').exec(style)
  return m?.[1]?.trim() ?? null
}

export class StyledTextNode extends TextNode {
  static override getType(): string {
    return 'styled-text'
  }

  static override clone(node: StyledTextNode): StyledTextNode {
    return new StyledTextNode(node.__text, node.__key)
  }

  static override importJSON(serializedNode: SerializedStyledTextNode): StyledTextNode {
    const node = new StyledTextNode(serializedNode.text)
    node.setStyle(serializedNode.style ?? '')
    node.setFormat(serializedNode.format)
    return node
  }

  override exportJSON(): SerializedStyledTextNode {
    return {
      ...super.exportJSON(),
      type: 'styled-text',
      version: 1,
      style: this.getStyle() ?? '',
    }
  }

  override createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config)
    const color = getStyleValue(this.getStyle(), 'color') ?? 'white'
    dom.style.color = color
    return dom
  }

  override updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig): boolean {
    const replaced = super.updateDOM(prevNode, dom, config)
    const color = getStyleValue(this.getStyle(), 'color') ?? 'white'
    if (dom.style.color !== color) dom.style.color = color
    return replaced
  }
}

export function $createStyledTextNode(text: string, key?: NodeKey) {
  return new StyledTextNode(text, key)
}
