"use client";

import { useEffect, useState } from "react";
import { FaHome, FaDollarSign, FaCreditCard, FaCalendarAlt } from "react-icons/fa";

export default function DashboardStats() {
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState("R$ 0,00");

  // Pegar contagem de propriedades
  useEffect(() => {
    const fetchPropertiesCount = async () => {
      try {
        const res = await fetch("/api/propriedades");
        if (!res.ok) throw new Error("Erro ao buscar propriedades");
        const data = await res.json();
        setTotalProperties(data.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPropertiesCount();
  }, []);

  // Pegar reservas (contagem + pendentes + receita do mês)
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("/api/reservas");
        if (!res.ok) throw new Error("Erro ao buscar reservas");
        const data = await res.json();

        setTotalReservations(data.length);

        // Pagamentos pendentes
        const pendingCount = data.filter(
          (reservation: any) => reservation.paymentStatus === "Pendente"
        ).length;
        setPendingPayments(pendingCount);

        // Receita do mês: soma totalValue das reservas com status "Realizado" no mês atual
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const revenue = data
          .filter(
            (reservation: any) =>
              reservation.paymentStatus === "Realizado" &&
              new Date(reservation.checkIn).getMonth() === currentMonth &&
              new Date(reservation.checkIn).getFullYear() === currentYear
          )
          .reduce((sum: number, reservation: any) => sum + reservation.totalValue, 0);

        setMonthlyRevenue(
          revenue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchReservations();
  }, []);

  const stats = [
    { title: "Total de Propriedades", value: totalProperties, icon: <FaHome /> },
    { title: "Total de Reservas", value: totalReservations, icon: <FaCalendarAlt /> },
    { title: "Pagamentos Pendentes", value: pendingPayments, icon: <FaCreditCard /> },
    { title: "Receita do Mês", value: monthlyRevenue, icon: <FaDollarSign /> },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between"
        >
          <div>
            <h3 className="text-gray-500 font-medium text-sm">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </div>
          <div className="text-blue-600 text-3xl">{stat.icon}</div>
        </div>
      ))}
    </>
  );
}
