"use client";

import { useEffect, useState, useCallback } from "react";
import { FaAngleDown } from "react-icons/fa";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import AddReservationModal from "@/src/components/AddReservationModal";

interface PropertyData {
  id: string;
  name: string;
  bedrooms: number;
  active: boolean;
}

interface ReservationData {
  id: string;
  checkIn: string;
  checkOut: string;
  canceled: boolean;
}

export default function CalendarPage() {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [range, setRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Buscar propriedades
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/propriedades");
        const data = await res.json();
        setProperties(data.filter((p: PropertyData) => p.active));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperties();
  }, []);

  // Função refetch para reservas da propriedade selecionada
  const fetchReservations = useCallback(async () => {
    if (!selectedProperty) return;

    try {
      const res = await fetch(`/api/reservas?propertyId=${selectedProperty}`);
      const data: ReservationData[] = await res.json();
      setReservations(data.filter((r) => !r.canceled));
    } catch (err) {
      console.error(err);
    }
  }, [selectedProperty]);

  // Buscar reservas quando a propriedade muda ou quando a função fetchReservations muda
  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // Dias bloqueados
  const blockedDays: Date[] = reservations.flatMap((r) =>
    Array.from(
      {
        length:
          (new Date(r.checkOut).getTime() -
            new Date(r.checkIn).getTime()) /
          (1000 * 60 * 60 * 24) +
          1,
      },
      (_, i) =>
        new Date(
          new Date(r.checkIn).getTime() + i * 24 * 60 * 60 * 1000
        )
    )
  );

  const handleOpenModal = () => {
    if (!selectedProperty || !range?.from || !range?.to) {
      alert("Selecione uma propriedade e um intervalo de datas para reservar.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Atualiza reservas após fechar modal
    fetchReservations();
  };

  return (
    <main className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Calendário</h2>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Linha inteira para selecionar a propriedade */}
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="property-select"
              className="block text-gray-700 font-medium mb-2"
            >
              Selecionar propriedade:
            </label>
            <div className="relative">
              <select
                id="property-select"
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              >
                <option value="">Selecione uma propriedade</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.bedrooms} quartos)
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <FaAngleDown />
              </div>
            </div>
          </div>

          <button
            onClick={handleOpenModal}
            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Reservar
          </button>
        </div>

        {/* Calendário abaixo */}
        <div className="w-full">
          {selectedProperty && (
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              disabled={blockedDays}
              styles={{
                head_cell: {
                  width: "100px",
                },
                table: {
                  maxWidth: "none",
                },
                day: {
                  margin: "auto",
                },
              }}
              className="w-full rdp-custom"
              modifiersClassNames={{
                selected: "bg-green-500 text-white rounded-lg",
                disabled:
                  "bg-red-300 text-gray-700 line-through rounded-lg",
              }}
            />
          )}
        </div>
      </div>

      {isModalOpen && range?.from && range?.to && selectedProperty && (
        <AddReservationModal
          onClose={handleCloseModal}
          initialPropertyId={selectedProperty}
          initialCheckIn={range.from}
          initialCheckOut={range.to}
        />
      )}

      {/* CSS inline para ajustar largura do calendário */}
      <style jsx global>{`
        .rdp-custom {
          display: inline-block;
          font-size: 1rem;
          --rdp-day-width : 180px;
          --rdp-day-height : 70px;
        }
      `}</style>
    </main>
  );
}
