import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'
import { isEditorOrAdmin } from '@/access/isEditorOrAdmin'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: isEditorOrAdmin,
    delete: isEditorOrAdmin,
    read: anyone,
    update: isEditorOrAdmin,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Taxonomy',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    ...slugField(),
  ],
}
