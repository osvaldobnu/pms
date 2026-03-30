'use client'

import { encerrarMesa } from '@/lib/actions/encerrar-mesa'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function EncerrarMesaButton({
  mesaId,
  disabled,
}: {
  mesaId: string
  disabled: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function encerrar() {
    if (!confirm('Tem certeza que deseja encerrar a mesa?')) {
      return
    }

    try {
      setLoading(true)
      await encerrarMesa(mesaId)

      // ✅ REDIRECIONAMENTO CORRETO
      router.replace('/dashboard/mesas')
    } catch (e: any) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={encerrar}
      disabled={disabled || loading}
      className="bg-red-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
    >
      🧹 Encerrar Mesa
    </button>
  )
}