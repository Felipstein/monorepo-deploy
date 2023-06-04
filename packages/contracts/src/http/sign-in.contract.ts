import { z } from 'zod'

export const signInRequestSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
})

export type SignInRequest = z.infer<typeof signInRequestSchema>
