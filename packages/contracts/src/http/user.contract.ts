import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(6).optional(),
})

export type User = z.infer<typeof userSchema>
