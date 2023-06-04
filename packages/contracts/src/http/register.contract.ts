import { z } from 'zod'

export const registerRequestSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(6),
})

export type RegisterRequest = z.infer<typeof registerRequestSchema>
