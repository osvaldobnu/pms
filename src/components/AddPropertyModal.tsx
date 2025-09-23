"use client";

import { FaTimes } from "react-icons/fa";
import { useRef, useState } from "react";

interface AddPropertyModalProps {
  onClose: () => void;
}

export default function AddPropertyModal({ onClose }: AddPropertyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    bedrooms: "",
    address: "",
    condo: "",
    features: "",
    lowSeason: "",
    holidays: "",
    christmas: "",
    newYear: "",
    carnival: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/propriedades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Propriedade criada com sucesso!");
      onClose();
    } else {
      alert("Erro ao criar propriedade.");
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-4">Nova Propriedade</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome *
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                Número de Quartos *
              </label>
              <input
                type="number"
                id="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Endereço *
            </label>
            <input
              type="text"
              id="address"
              value={form.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="condo" className="block text-sm font-medium text-gray-700">
              Condomínio
            </label>
            <input
              type="text"
              id="condo"
              value={form.condo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="features" className="block text-sm font-medium text-gray-700">
              Características
            </label>
            <textarea
              id="features"
              value={form.features}
              onChange={handleChange}
              rows={3}
              placeholder="Ex: Piscina, Churrasqueira, Wi-Fi..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="lowSeason" className="block text-sm font-medium text-gray-700">
                Valor Baixa Temporada *
              </label>
              <input
                type="number"
                id="lowSeason"
                value={form.lowSeason}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="holidays" className="block text-sm font-medium text-gray-700">
                Valor Feriados *
              </label>
              <input
                type="number"
                id="holidays"
                value={form.holidays}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="christmas" className="block text-sm font-medium text-gray-700">
                Valor Natal *
              </label>
              <input
                type="number"
                id="christmas"
                value={form.christmas}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="newYear" className="block text-sm font-medium text-gray-700">
                Valor Réveillon *
              </label>
              <input
                type="number"
                id="newYear"
                value={form.newYear}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="carnival" className="block text-sm font-medium text-gray-700">
                Valor Carnaval *
              </label>
              <input
                type="number"
                id="carnival"
                value={form.carnival}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
