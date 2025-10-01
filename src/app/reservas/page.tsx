"use client";

import AddReservationModal from "@/src/components/AddReservationModal";
import ReservasEmptyState from "@/src/components/ReservasEmptyState";
import { useState, useEffect, useCallback } from "react";
import { FaTimesCircle, FaEdit } from "react-icons/fa";
import { ReservationData } from "@/src/types";

export default function ReservasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservas, setReservas] = useState<ReservationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReserva, setEditingReserva] = useState<ReservationData | null>(null);

  const fetchReservas = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reservas", { cache: "no-store" });
      if (!res.ok) throw new Error("Erro ao buscar reservas");
      const data = await res.json();
      setReservas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setReservas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservas();
  }, [fetchReservas]);

  const handleOpenModal = () => {
    setEditingReserva(null);
    setIsModalOpen(true);
  };

  const handleEdit = (r: ReservationData) => {
    setEditingReserva(r);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReserva(null);
    fetchReservas();
  };

  const cancelReservation = async (id: string) => {
    try {
      const res = await fetch("/api/reservas", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Erro ao cancelar");
      fetchReservas();
    } catch (err) {
      console.error(err);
      alert("Erro ao cancelar reserva");
    }
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Reservas</h2>
        <button
          onClick={handleOpenModal}
          className="flex items-center bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span className="mr-2">+</span>
          Nova Reserva
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : reservas.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <ReservasEmptyState />
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="p-3">Código</th>
                <th className="p-3">Hóspede</th>
                <th className="p-3">Qtd. Hóspedes</th>
                <th className="p-3">Propriedade</th>
                <th className="p-3">Check-in</th>
                <th className="p-3">Check-out</th>
                <th className="p-3">Forma Pagamento</th>
                <th className="p-3">Status Pagamento</th>
                <th className="p-3">2ª Parcela</th>
                <th className="p-3">3ª Parcela</th>
                <th className="p-3">Valor Total</th>
                <th className="p-3">Valor Comissão</th>
                <th className="p-3">Comissão João</th>
                <th className="p-3">Comissão Mateus</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-3">{r.code || "-"}</td>
                  <td className="p-3">{r.guestName || "-"}</td>
                  <td className="p-3">{r.guestCount ?? "-"}</td>
                  <td className="p-3">{r.property?.name || "-"}</td>
                  <td className="p-3">{r.checkIn ? new Date(r.checkIn).toLocaleDateString() : "-"}</td>
                  <td className="p-3">{r.checkOut ? new Date(r.checkOut).toLocaleDateString() : "-"}</td>
                  <td className="p-3">{r.paymentMethod || "-"}</td>
                  <td className="p-3">{r.paymentStatus || "-"}</td>
                  <td className="p-3">{r.secondInstallmentDate ? new Date(r.secondInstallmentDate).toLocaleDateString() : "-"}</td>
                  <td className="p-3">{r.thirdInstallmentDate ? new Date(r.thirdInstallmentDate).toLocaleDateString() : "-"}</td>
                  <td className="p-3">{typeof r.totalValue === "number" ? r.totalValue.toFixed(2) : "-"}</td>
                  <td className="p-3">{r.commissionTotal != null ? r.commissionTotal.toFixed(2) : "-"}</td>
                  <td className="p-3">{r.commissionStatusJoao || "-"}</td>
                  <td className="p-3">{r.commissionStatusMateus || "-"}</td>
                  <td className="p-3 flex justify-center gap-3">
                    {!r.canceled && (
                      <>
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleEdit(r)}
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => cancelReservation(r.id)}
                          title="Cancelar"
                        >
                          <FaTimesCircle />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <AddReservationModal
          onClose={handleCloseModal}
          initialPropertyId={editingReserva?.property?.id || ""}
          initialCheckIn={editingReserva ? new Date(editingReserva.checkIn) : new Date()}
          initialCheckOut={
            editingReserva
              ? new Date(editingReserva.checkOut)
              : new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          }
          reservation={editingReserva || undefined}
        />
      )}
    </main>
  );
}
