'use client'

import { useEffect, useState } from 'react'
import { criarPessoaMesa, listarPessoasMesa } from '@/lib/actions/mesa-pessoas'

export default function PessoasMesa({ mesaId }: { mesaId: string }) {
  const [nome, setNome] = useState('')
  const [pessoas, setPessoas] = useState<any[]>([])

  useEffect(() => {
    listarPessoasMesa(mesaId).then(setPessoas)
  }, [mesaId])

  async function adicionar() {
    if (!nome.trim()) return
    const nova = await criarPessoaMesa(mesaId, nome)
    setPessoas(prev => [...prev, nova])
    setNome('')
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Quem está na mesa?</h3>

      <div className="flex gap-2">
        <input
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Nome (ex: Ricardo)"
          className="border p-2 rounded"
        />
        <button
          onClick={adicionar}
          className="bg-black text-white px-3 rounded"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-1">
        {pessoas.map(p => (
          <li key={p.id} className="text-sm">
            👤 {p.name}
          </li>
        ))}
      </ul>
    </div>
  )
}