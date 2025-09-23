import { FaCalendarAlt } from 'react-icons/fa';

export default function CalendarEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="text-gray-400 mb-4">
        <FaCalendarAlt className="text-6xl" />
      </div>
      <p className="text-xl font-semibold text-gray-700 mb-1">Nenhuma propriedade encontrada</p>
      <p className="text-gray-500">Cadastre uma propriedade primeiro para gerenciar o calendário.</p>
    </div>
  );
}