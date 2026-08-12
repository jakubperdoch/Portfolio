import { Access, FieldAccess } from 'payload'
import { User } from '@/payload-types'

export const isAdmin: Access<any> = ({ req }) => {
  const user = req.user as User | undefined
  return !!user && user.role === 'admin'
}

export const isAdminFieldLevel: FieldAccess<any, any> = ({ req }) => {
  const user = req.user as User | undefined
  return !!user && user.role === 'admin'
}
