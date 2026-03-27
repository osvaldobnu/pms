import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LogoutPage() {
  const cookieStore = await cookies()

  // 🔥 Remove cookies de sessão
  cookieStore.delete('userId')
  cookieStore.delete('userRole')

  // ✅ Redireciona para login
  redirect('/login')
}