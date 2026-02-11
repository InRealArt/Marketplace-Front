import { PrismaClient } from '../../prisma/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  })
  return new PrismaClient(
    { adapter }
    /*
    {
    log: [
      {
        emit: 'event',
        level: 'query',
      }
    ],
  }*/
  )
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()
/*
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})
*/

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
