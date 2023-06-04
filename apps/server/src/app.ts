import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { userRoutes } from './routes/user.routes'
import { authRoutes } from './routes/auth.routes'

const app = fastify()

app.register(cors, {
  origin: 'http://localhost:3000',
})

app.register(jwt, {
  secret: process.env.JWT_SECRET!,
})

app.register(authRoutes)
app.register(userRoutes)

export { app }
