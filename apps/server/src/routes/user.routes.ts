import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../database'

export async function userRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (req) => {
    // @ts-ignore
    await req.jwtVerify()
  })

  app.get('/users/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = paramsSchema.parse(req)

    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
      },
    })

    return user
  })

  app.delete('/users/:id', async (req, reply) => {
    const paramsSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
    })

    if (user.id !== id) {
      return reply.status(401).send()
    }

    await prisma.user.delete({
      where: { id },
    })
  })
}
