import { FaBuilding } from 'react-icons/fa';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="text-gray-400 mb-4">
        <FaBuilding className="text-6xl" />
      </div>
      <p className="text-xl font-semibold text-gray-700 mb-1">Nenhuma propriedade</p>
      <p className="text-gray-500">Comece criando sua primeira propriedade.</p>
    </div>
  );
}