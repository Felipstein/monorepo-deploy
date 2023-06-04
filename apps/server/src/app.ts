import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { userRoutes } from './routes/user.routes'
import { authRoutes } from './routes/auth.routes'
import { env } from './config/env.config'

const app = fastify()

app.register(cors, {
  origin: env.ORIGIN,
})

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.register(authRoutes)
app.register(userRoutes)

export { app }
