// styleFeatureFactory.ts
'use client'

import React from 'react'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_CRITICAL,
  createCommand,
} from 'lexical'
import { $patchStyleText, $getSelectionStyleValueForProperty } from '@lexical/selection'
import { Bold } from 'lucide-react'
import { $createStyledTextNode } from '@/fields/nodes/StyledTextNode'

type StyleDef = { label: string; css: Record<string, string> }
const BoldIcon: React.FC = () => <Bold size={13} />

const toReactStyle = (css: Record<string, string> | undefined): React.CSSProperties => {
  const src = css ?? {}
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(src)) {
    const camel = k.startsWith('-webkit-')
      ? 'Webkit' + k.slice('-webkit-'.length).replace(/-([a-z])/g, (_, l) => l.toUpperCase())
      : k.replace(/-([a-z])/g, (_, l) => l.toUpperCase())
    out[camel] = v
  }
  return out
}

function $ensureStyledNodesInSelection() {
  const sel = $getSelection()
  if (!$isRangeSelection(sel)) return
  sel.getNodes().forEach((n) => {
    if ($isTextNode(n) && n.getType() !== 'styled-text') {
      const styled = $createStyledTextNode(n.getTextContent())
      styled.setFormat(n.getFormat())
      styled.setDetail(n.getDetail())
      styled.setMode(n.getMode())
      styled.setStyle(n.getStyle())
      n.replace(styled)
    }
  })
}

export function createStyleFeature<const M extends Record<string, StyleDef>>(opts: {
  key: string
  icon?: React.FC
  variables: M
  renderItemLabel?: (key: keyof M & string, def: M[keyof M]) => React.ReactNode
  applyLabelStyle?: boolean
  isButtonVariant?: boolean
}) {
  type Key = keyof M & string
  const COMMAND = createCommand<Key>()

  const Plugin: React.FC = () => {
    const [editor] = useLexicalComposerContext()
    React.useEffect(() => {
      return editor.registerCommand(
        COMMAND,
        (k) => {
          const def = opts.variables[k as Key]
          if (!def) return false
          editor.update(() => {
            $ensureStyledNodesInSelection()
            const sel = $getSelection()
            if ($isRangeSelection(sel)) {
              $patchStyleText(sel, def.css)
            }
          })
          return true
        },
        COMMAND_PRIORITY_CRITICAL,
      )
    }, [editor])
    return null
  }

  const keys = Object.keys(opts.variables) as Key[]
  const ChildComponent: React.FC = opts.icon ?? BoldIcon

  const ItemPreview: React.FC<{ css: Record<string, string> }> = ({ css }) =>
    opts.applyLabelStyle ? <span style={toReactStyle(css)}>A</span> : <span>A</span>

  const group = opts.isButtonVariant
    ? {
        type: 'buttons' as const,
        key: `${opts.key}-buttons`,
        items: keys.map((k) => {
          const def = opts.variables[k]!
          return {
            key: k,
            label: (opts.renderItemLabel?.(k, def) as any) ?? def.label,
            ChildComponent: () => <ChildComponent />,
            onSelect: ({ editor }: { editor: any }) => editor.dispatchCommand(COMMAND, k),
          }
        }),
      }
    : {
        type: 'dropdown' as const,
        key: opts.key,
        ChildComponent: ChildComponent,
        items: keys.map((k) => {
          const def = opts.variables[k]!
          return {
            key: k,
            label: (opts.renderItemLabel?.(k, def) as any) ?? def.label,
            ChildComponent: () => <ItemPreview css={def.css} />,
            onSelect: ({ editor }: { editor: any }) => editor.dispatchCommand(COMMAND, k),
            isActive: ({ editor }: { editor: any }) => {
              let active = false

              editor.getEditorState().read(() => {
                const sel = $getSelection()
                if (!$isRangeSelection(sel)) {
                  active = false
                  return
                }

                active = Object.entries(def.css).every(([prop, expected]) => {
                  const current = $getSelectionStyleValueForProperty(sel, prop, '')
                  return String(current) === String(expected)
                })
              })

              return active
            },
          }
        }),
      }

  return {
    COMMAND,
    Feature: createClientFeature({
      plugins: [{ Component: Plugin, position: 'normal' }],
      toolbarFixed: {
        groups: [group],
      },
      toolbarInline: {
        groups: [group],
      },
    }),
  }
}
