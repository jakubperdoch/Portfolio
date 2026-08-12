import { Access } from 'payload'

export const isAdminOrSelf: Access<any> = ({ req }) => {
  if (!req.user) return false

  if (req.user) {
    if (req.user.role === 'admin') return true

    return {
      id: {
        equals: req.user.id,
      },
    }
  }

  return false
}
