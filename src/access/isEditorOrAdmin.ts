import { Access, FieldAccess } from 'payload'
import { User } from '@/payload-types'

export const isEditorOrAdmin: Access<any> = ({ req }) => {
  const user = req.user as User | undefined
  return (!!user && user.role === 'editor') || (!!user && user.role === 'admin')
}

export const isEditorFieldLevel: FieldAccess<any, any> = ({ req }) => {
  const user = req.user as User | undefined
  return (!!user && user.role === 'editor') || (!!user && user.role === 'admin')
}
