import type { Block } from 'payload'

import { codeLanguages } from './languages'

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  labels: {
    singular: 'Code',
    plural: 'Code blocks',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'language',
          type: 'select',
          defaultValue: 'typescript',
          options: [...codeLanguages],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'filename',
          type: 'text',
          admin: {
            description: 'Optional — shown in the header, e.g. `src/app/page.tsx`.',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'showLineNumbers',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show line numbers',
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
      localized: true,
      admin: {
        language: 'typescript',
      },
    },
  ],
}
