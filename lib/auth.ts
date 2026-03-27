import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function getUserFromSession() {
  const cookieStore = await cookies() // ✅ NEXT 16: precisa await
  const userId = cookieStore.get('userId')?.value

  if (!userId) return null

  return prisma.user.findUnique({
    where: { id: userId },
  })
}