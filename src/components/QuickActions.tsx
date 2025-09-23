"use client";

import { useState } from "react";
import Link from "next/link";
import { FaHome, FaPlusCircle, FaCalendarAlt } from "react-icons/fa";
import PropertyModal from "@/src/components/PropertyModal";
import AddReservationModal from "@/src/components/AddReservationModal";

export default function QuickActions() {
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  // Funções para abrir/fechar modais
  const handleOpenPropertyModal = () => setIsPropertyModalOpen(true);
  const handleClosePropertyModal = () => setIsPropertyModalOpen(false);

  const handleOpenReservationModal = () => setIsReservationModalOpen(true);
  const handleCloseReservationModal = () => setIsReservationModalOpen(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full">
      <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
      <div className="space-y-4">
        {/* Botão para abrir modal de Propriedade */}
        <button
          onClick={handleOpenPropertyModal}
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
        >
          <FaHome className="text-blue-600 text-2xl mr-4" />
          <div>
            <p className="font-semibold">Cadastrar Propriedade</p>
            <p className="text-sm text-gray-500">Adicionar nova propriedade ao sistema</p>
          </div>
        </button>

        {/* Botão para abrir modal de Reserva */}
        <button
          onClick={handleOpenReservationModal}
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
        >
          <FaPlusCircle className="text-blue-600 text-2xl mr-4" />
          <div>
            <p className="font-semibold">Nova Reserva</p>
            <p className="text-sm text-gray-500">Criar uma nova reserva</p>
          </div>
        </button>

        {/* Link normal */}
        <Link
          href="/calendario"
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaCalendarAlt className="text-blue-600 text-2xl mr-4" />
          <div>
            <p className="font-semibold">Gerenciar Calendário</p>
            <p className="text-sm text-gray-500">Atualizar tarifas e disponibilidade</p>
          </div>
        </Link>
      </div>

      {/* Modais */}
      {isPropertyModalOpen && <PropertyModal onClose={handleClosePropertyModal} />}
      {isReservationModalOpen && (
        <AddReservationModal
          onClose={handleCloseReservationModal}
          initialPropertyId=""
          initialCheckIn={new Date()}
          initialCheckOut={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
        />
      )}
    </div>
  );
}
