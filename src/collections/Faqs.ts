import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'
import { isAdmin } from '@/access/isAdmin'

const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'updatedAt'],
    group: 'Taxonomy',
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: anyone,
    update: isAdmin,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Question',
      localized: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      label: 'Answer',
      localized: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sort Order',
      admin: {
        description: 'Used to determine the order of FAQs',
      },
    },
    ...slugField(),
  ],
  timestamps: true,
}

export default Faqs
