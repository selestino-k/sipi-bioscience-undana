'use server'
import type { PrismaClient } from '@prisma/client'
export async function extendsDb(prisma: PrismaClient) {
   prisma.$extends(....) 
   ....
}
