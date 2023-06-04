import { PrismaClient } from '@prisma/client'

const prisma =
  process.env.NODE_ENV === 'development'
    ? new PrismaClient({ log: ['query'] })
    : new PrismaClient()

export { prisma }
