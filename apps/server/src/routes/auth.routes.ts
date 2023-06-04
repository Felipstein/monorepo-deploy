import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'

import {
  registerRequestSchema,
  signInRequestSchema,
  AuthResponse,
} from '@monorepo-deploy/contracts'

import { prisma } from '../database'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (req, reply) => {
    const { name, email, password } = registerRequestSchema.parse(req.body)

    const emailAlreadyExists = await prisma.user.findUnique({
      where: { email },
    })
    if (emailAlreadyExists) {
      return reply.status(400).send({ errorFeedback: 'E-mail já cadastrado' })
    }

    const encryptedPassword = await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
      data: { name, email, password: encryptedPassword },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
      },
    })

    // @ts-ignore
    const token = app.jwt.sign(
      {
        email: user.email,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return {
      token,
      user,
    } as AuthResponse
  })

  app.post('/signin', async (req, reply) => {
    const { email, password } = signInRequestSchema.parse(req.body)

    const user = await prisma.user.findUniqueOrThrow({
      where: { email },
    })

    if (!(await bcrypt.compare(password, user.password))) {
      return reply
        .status(401)
        .send({ errorFeedback: 'E-mail ou senha inválidos.' })
    }

    // @ts-ignore
    const token = app.jwt.sign(
      {
        email: user.email,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return {
      token,
      user,
    } as AuthResponse
  })
}
