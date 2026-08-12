import React from 'react'

interface WelcomeBannerProps {
  user?: {
    email?: string
    name?: string
  }
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = async ({ user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const getUserName = () => {
    if (user?.name) return user.name
    if (user?.email) return user.email.split('@')[0]
    return 'there'
  }

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div
      className="rounded-lg border p-6 mb-6"
      style={{
        backgroundColor: 'var(--theme-elevation-50)',
        borderColor: 'var(--theme-elevation-100)',
      }}
    >
      <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--theme-elevation-1000)' }}>
        {getGreeting()}, {getUserName()}! 👋
      </h2>
      <p className="text-base mb-4" style={{ color: 'var(--theme-elevation-600)' }}>
        Welcome to your content management dashboard. Here's an overview of your site's activity and
        quick access to common tasks.
      </p>
      <span className="text-sm" style={{ color: 'var(--theme-elevation-400)' }}>
        {formatDate()}
      </span>
    </div>
  )
}

export default WelcomeBanner
