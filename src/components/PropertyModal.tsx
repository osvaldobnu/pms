"use client";

import { FaTimes } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { PropertyForm } from "../types";

interface PropertyModalProps {
  onClose: () => void;
  property?: PropertyForm; // se vier = edição
}

export default function PropertyModal({ onClose, property }: PropertyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<PropertyForm>({
    id: "",
    name: "",
    title: "",
    description: "",
    phone: "",
    ranking: "",
    location: "",
    locationNotes: "",
    beach: "",
    guests: "",
    bedrooms: "",
    beds: "",
    amenities: "",
    extraGuestFee: "",
    cleaningFee: "",  // NOVO CAMPO
    crib: "",
    childBed: "",
    doubleBed: "",
    foldingBed: "",
    kingBed: "",
    mezzanineBed: "",
    queenBed: "",
    sofaBed: "",
    singleBed: "",
    lowSeason: "",
    holidays: "",
    christmas: "",
    newYear: "",
    carnival: "",
  });

  useEffect(() => {
    if (property) {

      setForm({
        id: property.id ?? "",
        name: property.name ?? "",
        title: property.title ?? "",
        description: property.description ?? "",
        phone: property.phone ?? "",
        ranking: property.ranking !== undefined && property.ranking !== null ? String(property.ranking) : "",
        location: property.location ?? "",
        locationNotes: property.locationNotes ?? "",
        beach: property.beach ?? "",
        guests: property.guests !== undefined && property.guests !== null ? String(property.guests) : "",
        bedrooms: property.bedrooms !== undefined && property.bedrooms !== null ? String(property.bedrooms) : "",
        beds: property.beds !== undefined && property.beds !== null ? String(property.beds) : "",
        amenities: property.amenities ?? "",
        extraGuestFee: property.extraGuestFee !== undefined && property.extraGuestFee !== null ? String(property.extraGuestFee) : "",
        cleaningFee: property.cleaningFee != null ? String(property.cleaningFee) : "",
        crib: property.crib !== undefined && property.crib !== null ? String(property.crib) : "",
        childBed: property.childBed !== undefined && property.childBed !== null ? String(property.childBed) : "",
        doubleBed: property.doubleBed !== undefined && property.doubleBed !== null ? String(property.doubleBed) : "",
        foldingBed: property.foldingBed !== undefined && property.foldingBed !== null ? String(property.foldingBed) : "",
        kingBed: property.kingBed !== undefined && property.kingBed !== null ? String(property.kingBed) : "",
        mezzanineBed: property.mezzanineBed !== undefined && property.mezzanineBed !== null ? String(property.mezzanineBed) : "",
        queenBed: property.queenBed !== undefined && property.queenBed !== null ? String(property.queenBed) : "",
        sofaBed: property.sofaBed !== undefined && property.sofaBed !== null ? String(property.sofaBed) : "",
        singleBed: property.singleBed !== undefined && property.singleBed !== null ? String(property.singleBed) : "",
        lowSeason: property.lowSeason !== undefined && property.lowSeason !== null ? String(property.lowSeason) : "",
        holidays: property.holidays !== undefined && property.holidays !== null ? String(property.holidays) : "",
        christmas: property.christmas !== undefined && property.christmas !== null ? String(property.christmas) : "",
        newYear: property.newYear !== undefined && property.newYear !== null ? String(property.newYear) : "",
        carnival: property.carnival !== undefined && property.carnival !== null ? String(property.carnival) : "",
      });
    }
  }, [property]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = property?.id ? "PUT" : "POST";

    const res = await fetch("/api/propriedades", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert(property ? "Propriedade atualizada!" : "Propriedade criada!");
      onClose();
    } else {
      alert("Erro ao salvar propriedade.");
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 relative overflow-y-auto max-h-[95vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {property ? "Editar Propriedade" : "Nova Propriedade"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título e Ranking */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título *
              </label>
              <input
                type="text"
                id="title"
                value={form.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="ranking" className="block text-sm font-medium text-gray-700">
                Ranking (1 a 10)
              </label>
              <input
                type="number"
                id="ranking"
                min="1"
                max="10"
                value={form.ranking}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          {/* Nome e Telefone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome do Proprietário *
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="text"
                id="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none"
            />
          </div>

          {/* Localização e Praia */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Localização
              </label>
              <input
                type="text"
                id="location"
                value={form.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="locationNotes" className="block text-sm font-medium text-gray-700">
                Observações Localização
              </label>
              <input
                type="text"
                id="locationNotes"
                value={form.locationNotes}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="beach" className="block text-sm font-medium text-gray-700">
                Praia
              </label>
              <input
                type="text"
                id="beach"
                value={form.beach}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          {/* Hóspedes, Quartos, Camas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                Nº de Hóspedes *
              </label>
              <input
                type="number"
                id="guests"
                min="1"
                value={form.guests}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                Nº de Quartos *
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
            <div>
              <label htmlFor="beds" className="block text-sm font-medium text-gray-700">
                Nº de Camas *
              </label>
              <input
                type="number"
                id="beds"
                value={form.beds}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>

          {/* Taxa de Faxina */}
          <div>
            <label htmlFor="cleaningFee" className="block text-sm font-medium text-gray-700">
              Taxa de Faxina
            </label>
            <input
              type="number"
              id="cleaningFee"
              value={form.cleaningFee}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              min={0}
            />
          </div>

          {/* Configuração das Camas */}
          <div>
            <h3 className="text-lg font-semibold mt-6 mb-2">Configuração das Camas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "crib", label: "Berço" },
                { id: "childBed", label: "Cama de Criança" },
                { id: "doubleBed", label: "Cama de Casal" },
                { id: "foldingBed", label: "Cama Desmontável" },
                { id: "kingBed", label: "Cama King-Size" },
                { id: "mezzanineBed", label: "Cama Mezanino" },
                { id: "queenBed", label: "Cama Queen-Size" },
                { id: "sofaBed", label: "Sofá-Cama" },
                { id: "singleBed", label: "Cama Individual" },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    id={field.id}
                    value={(form as any)[field.id]}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Valores por temporada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["lowSeason", "holidays", "christmas", "newYear", "carnival"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field === "lowSeason" && "Valor Baixa Temporada *"}
                  {field === "holidays" && "Valor Feriados *"}
                  {field === "christmas" && "Valor Natal *"}
                  {field === "newYear" && "Valor Réveillon *"}
                  {field === "carnival" && "Valor Carnaval *"}
                </label>
                <input
                  type="number"
                  id={field}
                  value={(form as any)[field]}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            ))}
          </div>

          {/* Botões */}
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
              {property ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
