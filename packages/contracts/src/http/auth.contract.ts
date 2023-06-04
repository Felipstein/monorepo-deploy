import { z } from 'zod'

import { userSchema } from './user.contract'

export const authResponseSchema = z.object({
  token: z.string().nonempty(),
  user: userSchema,
})

export type AuthResponse = z.infer<typeof authResponseSchema>
