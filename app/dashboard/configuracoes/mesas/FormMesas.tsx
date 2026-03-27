'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { configurarQuantidadeMesas } from '@/lib/actions/configurarMesas'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {pending ? 'Salvando...' : 'Salvar configuração'}
    </button>
  )
}

export default function FormMesas({
  totalMesas,
}: {
  totalMesas: number
}) {
  const [state, action] = useActionState(
    configurarQuantidadeMesas,
    null
  )

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        Quantidade de mesas:
        <input
          type="number"
          name="quantidade"
          defaultValue={totalMesas}
          min={1}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <SubmitButton />

      {state?.message && (
        <p
          className={`text-sm mt-2 ${
            state.success ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  )
}