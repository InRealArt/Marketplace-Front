import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient(
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