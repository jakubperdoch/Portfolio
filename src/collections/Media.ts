import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '@/access/anyone'
import { isEditorOrAdmin } from '@/access/isEditorOrAdmin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const webpFormat = {
  format: 'webp' as const,
  options: {
    quality: 85,
  },
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Assets',
  },
  access: {
    create: isEditorOrAdmin,
    delete: isEditorOrAdmin,
    read: anyone,
    update: isEditorOrAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        position: 'centre',
        formatOptions: webpFormat,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        position: 'centre',
        formatOptions: webpFormat,
      },
      {
        name: 'small',
        width: 600,
        position: 'centre',
        formatOptions: webpFormat,
      },
      {
        name: 'medium',
        width: 900,
        position: 'centre',
        formatOptions: webpFormat,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
        position: 'centre',
        formatOptions: webpFormat,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
