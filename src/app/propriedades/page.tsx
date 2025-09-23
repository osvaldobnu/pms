"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import PropertyModal from "@/src/components/PropertyModal";
import EmptyState from "@/src/components/EmptyState";
import { PropertyData, PropertyForm } from "@/src/types";

export default function PropertiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyForm | null>(null);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);
    const res = await fetch("/api/propriedades");
    const data = await res.json();
    setProperties(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const toggleStatus = async (id: string, active: boolean) => {
    await fetch("/api/propriedades", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active }),
    });

    fetchProperties();
  };

  const handleOpenModal = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleEdit = (property: PropertyData) => {
    setEditingProperty({
      id: property.id,
      name: property.name,
      title: property.title,
      description: property.description || "",
      phone: property.phone || "",
      ranking: property.ranking ? String(property.ranking) : "",
      location: property.location || "",
      locationNotes: property.locationNotes || "",
      beach: property.beach || "",
      guests: String(property.guests),
      bedrooms: String(property.bedrooms),
      beds: String(property.beds),
      amenities: property.amenities || "",
      extraGuestFee: property.extraGuestFee ? String(property.extraGuestFee) : "",
      crib: property.crib ? String(property.crib) : "",
      childBed: property.childBed ? String(property.childBed) : "",
      doubleBed: property.doubleBed ? String(property.doubleBed) : "",
      foldingBed: property.foldingBed ? String(property.foldingBed) : "",
      kingBed: property.kingBed ? String(property.kingBed) : "",
      mezzanineBed: property.mezzanineBed ? String(property.mezzanineBed) : "",
      queenBed: property.queenBed ? String(property.queenBed) : "",
      sofaBed: property.sofaBed ? String(property.sofaBed) : "",
      singleBed: property.singleBed ? String(property.singleBed) : "",
      lowSeason: String(property.lowSeason),
      holidays: String(property.holidays),
      christmas: String(property.christmas),
      newYear: String(property.newYear),
      carnival: String(property.carnival),
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
    fetchProperties();
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Propriedades</h2>
        <button
          onClick={handleOpenModal}
          className="flex items-center bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <FaPlus className="mr-2" />
          Nova Propriedade
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : properties.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <EmptyState />
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="p-3">Proprietário</th>
                <th className="p-3">Título</th>
                <th className="p-3">Telefone</th>
                <th className="p-3">Ranking</th>
                <th className="p-3">Hóspedes</th>
                <th className="p-3">Quartos</th>
                <th className="p-3">Camas</th>
                <th className="p-3">Berço</th>
                <th className="p-3">Criança</th>
                <th className="p-3">Casal</th>
                <th className="p-3">Desmontável</th>
                <th className="p-3">King</th>
                <th className="p-3">Mezanino</th>
                <th className="p-3">Queen</th>
                <th className="p-3">Sofá-Cama</th>
                <th className="p-3">Individual</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr
                  key={property.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium">{property.name}</td>
                  <td className="p-3">{property.title}</td>
                  <td className="p-3">{property.phone || "-"}</td>
                  <td className="p-3">{property.ranking || "-"}</td>
                  <td className="p-3">{property.guests}</td>
                  <td className="p-3">{property.bedrooms}</td>
                  <td className="p-3">{property.beds}</td>
                  <td className="p-3">{property.crib || "-"}</td>
                  <td className="p-3">{property.childBed || "-"}</td>
                  <td className="p-3">{property.doubleBed || "-"}</td>
                  <td className="p-3">{property.foldingBed || "-"}</td>
                  <td className="p-3">{property.kingBed || "-"}</td>
                  <td className="p-3">{property.mezzanineBed || "-"}</td>
                  <td className="p-3">{property.queenBed || "-"}</td>
                  <td className="p-3">{property.sofaBed || "-"}</td>
                  <td className="p-3">{property.singleBed || "-"}</td>
                  <td className="p-3">
                    {property.active ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        Ativa
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                        Inativa
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEdit(property)}
                    >
                      <FaEdit />
                    </button>

                    {property.active ? (
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => toggleStatus(property.id, false)}
                      >
                        <FaTrash />
                      </button>
                    ) : (
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => toggleStatus(property.id, true)}
                      >
                        <FaCheck />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <PropertyModal
          onClose={handleCloseModal}
          property={editingProperty || undefined}
        />
      )}
    </main>
  );
}
