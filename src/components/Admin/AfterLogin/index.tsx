'use client'

import React from 'react'

const AGENCY_CONFIG = {
  name: process.env.NEXT_PUBLIC_AGENCY_NAME || 'Devehope Technologies',
  website: process.env.NEXT_PUBLIC_AGENCY_WEBSITE || 'https://www.devehope.com',
}

export const AfterLogin: React.FC = () => {
  return (
    <div className="mt-8 pt-6">
      <a
        href={AGENCY_CONFIG.website}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
      >
        <span>Built by</span>
        <span className="font-medium">{AGENCY_CONFIG.name}</span>
      </a>
    </div>
  )
}

export default AfterLogin
