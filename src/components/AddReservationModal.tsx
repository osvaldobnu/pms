"use client";

import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ReservationForm, ReservationData, PropertyData } from "@/src/types";

interface AddReservationModalProps {
  onClose: () => void;
  initialPropertyId: string;
  initialCheckIn: Date;
  initialCheckOut: Date;
  reservation?: ReservationData;
}

export default function AddReservationModal({
  onClose,
  initialPropertyId,
  initialCheckIn,
  initialCheckOut,
  reservation,
}: AddReservationModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [form, setForm] = useState<ReservationForm>({
    code: "",
    guestName: "",
    guestCount: "",
    propertyId: initialPropertyId || "",
    checkIn: initialCheckIn.toISOString().split("T")[0],
    checkOut: initialCheckOut.toISOString().split("T")[0],
    totalValue: "",
    notes: "",
    paymentMethod: "",
    paymentStatus: "",
    secondInstallmentDate: "",
    thirdInstallmentDate: "",
    commissionTotal: "",
    cleaningFee: "",
    monetaryValue: "",
  });

  // Preencher quando for edição
  useEffect(() => {
    if (reservation) {
      setForm({
        code: reservation.code || "",
        guestName: reservation.guestName,
        guestCount: reservation.guestCount !== undefined ? String(reservation.guestCount) : "",
        propertyId: reservation.property?.id || "",
        checkIn: reservation.checkIn ? new Date(reservation.checkIn).toISOString().split("T")[0] : "",
        checkOut: reservation.checkOut ? new Date(reservation.checkOut).toISOString().split("T")[0] : "",
        totalValue: reservation.totalValue !== undefined ? String(reservation.totalValue) : "",
        notes: reservation.notes || "",
        paymentMethod: reservation.paymentMethod || "",
        paymentStatus: reservation.paymentStatus || "",
        secondInstallmentDate: reservation.secondInstallmentDate
          ? new Date(reservation.secondInstallmentDate).toISOString().split("T")[0]
          : "",
        thirdInstallmentDate: reservation.thirdInstallmentDate
          ? new Date(reservation.thirdInstallmentDate).toISOString().split("T")[0]
          : "",
        commissionTotal:
          reservation.commissionTotal !== undefined && reservation.commissionTotal !== null
            ? String(reservation.commissionTotal)
            : "",
        cleaningFee: reservation.cleaningFee !== undefined ? String(reservation.cleaningFee) : "",
        monetaryValue: reservation.monetaryValue !== undefined ? String(reservation.monetaryValue) : "",
      });
    }
  }, [reservation]);

  // Buscar próximo código quando for nova reserva
  useEffect(() => {
    const fetchNextCode = async () => {
      if (!reservation) {
        try {
          const res = await fetch("/api/reservas/next-code");
          const data = await res.json();
          setForm((prev) => ({ ...prev, code: data.nextCode }));
        } catch (err) {
          console.error("Erro ao buscar próximo código", err);
        }
      }
    };
    fetchNextCode();
  }, [reservation]);

  // Buscar propriedades ativas
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/propriedades");
        const data = await res.json();
        setProperties(Array.isArray(data) ? data.filter((p: PropertyData) => p.active) : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperties();
  }, []);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // Recalcula valor total (valor da reserva + taxa de faxina)
  useEffect(() => {
    const calculateTotalValue = async () => {
      if (!form.propertyId || !form.checkIn || !form.checkOut) return;

      try {
        const res = await fetch("/api/reservas/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertyId: form.propertyId,
            checkIn: form.checkIn,
            checkOut: form.checkOut,
            guestCount: form.guestCount ? parseInt(form.guestCount) : 0,
          }),
        });

        if (!res.ok) return;
        const data = await res.json();

        if (data && data.totalValue !== undefined) {
          const cleaning = parseFloat(form.cleaningFee || "0");
          const total = parseFloat(data.totalValue) + cleaning;
          setForm((prev) => ({ ...prev, totalValue: total.toFixed(2) }));
        }
      } catch (err) {
        console.error("Erro ao calcular valor:", err);
      }
    };

    calculateTotalValue();
  }, [form.propertyId, form.checkIn, form.checkOut, form.guestCount, form.cleaningFee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = reservation?.id ? "PUT" : "POST";

    try {
      const bodyPayload: any = {
        code: form.code,
        guestName: form.guestName,
        guestCount: form.guestCount ? parseInt(form.guestCount) : null,
        propertyId: form.propertyId,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        totalValue: parseFloat(form.totalValue) || 0,
        notes: form.notes || null,
        paymentMethod: form.paymentMethod || null,
        paymentStatus: form.paymentStatus || null,
        secondInstallmentDate: form.secondInstallmentDate || null,
        thirdInstallmentDate: form.thirdInstallmentDate || null,
        commissionTotal: form.commissionTotal ? parseFloat(form.commissionTotal) : null,
        cleaningFee: form.cleaningFee ? parseFloat(form.cleaningFee) : null,
        monetaryValue: form.monetaryValue ? parseFloat(form.monetaryValue) : null,
      };

      if (reservation?.id) bodyPayload.id = reservation.id;

      const res = await fetch("/api/reservas", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      if (res.ok) {
        alert(reservation ? "Reserva atualizada com sucesso!" : "Reserva criada com sucesso!");
        onClose();
      } else {
        console.error(await res.text());
        alert("Erro ao salvar reserva.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar reserva.");
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-4">{reservation ? "Editar Reserva" : "Nova Reserva"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Código */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Código
            </label>
            <input
              type="text"
              id="code"
              value={form.code}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="guestName" className="block text-sm font-medium text-gray-700">
                Nome do Hóspede *
              </label>
              <input
                type="text"
                id="guestName"
                value={form.guestName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700">
                Número de Hóspedes
              </label>
              <input
                type="number"
                id="guestCount"
                value={form.guestCount}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min={1}
              />
            </div>

            <div>
              <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">
                Propriedade *
              </label>
              <select
                id="propertyId"
                value={form.propertyId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="">Selecione a propriedade</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.bedrooms} quartos)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                  Check-in *
                </label>
                <input
                  type="date"
                  id="checkIn"
                  value={form.checkIn}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                  Check-out *
                </label>
                <input
                  type="date"
                  id="checkOut"
                  value={form.checkOut}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                Forma de Pagamento
              </label>
              <select
                id="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Selecione</option>
                <option value="Cartão">Cartão</option>
                <option value="Pix">Pix</option>
                <option value="Pix Parcelado">Pix Parcelado</option>
              </select>
            </div>

            <div>
              <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700">
                Status de Pagamento
              </label>
              <select
                id="paymentStatus"
                value={form.paymentStatus}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Selecione</option>
                <option value="Realizado">Realizado</option>
                <option value="Pago Entrada">Pago Entrada</option>
                <option value="Pendente">Pendente</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="secondInstallmentDate" className="block text-sm font-medium text-gray-700">
                  2ª Parcela
                </label>
                <input
                  type="date"
                  id="secondInstallmentDate"
                  value={form.secondInstallmentDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="thirdInstallmentDate" className="block text-sm font-medium text-gray-700">
                  3ª Parcela
                </label>
                <input
                  type="date"
                  id="thirdInstallmentDate"
                  value={form.thirdInstallmentDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="monetaryValue" className="block text-sm font-medium text-gray-700">
                Valor Monetário
              </label>
              <input
                type="number"
                id="monetaryValue"
                value={form.monetaryValue}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min={0}
              />
            </div>

            <div>
              <label htmlFor="commissionTotal" className="block text-sm font-medium text-gray-700">
                Valor Total da Comissão
              </label>
              <input
                type="number"
                id="commissionTotal"
                value={form.commissionTotal}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div>
              <label htmlFor="totalValue" className="block text-sm font-medium text-gray-700">
                Valor Total *
              </label>
              <input
                type="number"
                id="totalValue"
                value={form.totalValue}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Observações
            </label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Ex: Necessita berço, chegada após 22h..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none"
            ></textarea>
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
              {reservation ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
