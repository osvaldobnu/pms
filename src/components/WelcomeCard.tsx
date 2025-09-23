export default function WelcomeCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full">
      <h3 className="text-lg font-semibold mb-2">Bem-vindo ao PMS Airbnb</h3>
      <p className="text-gray-600 mb-4">
        Sistema completo de gestão de propriedades para Airbnb. Gerencie suas
        propriedades, calendários e reservas de forma eficiente.
      </p>
      <div className="text-gray-700">
        <h4 className="font-semibold mb-2">Funcionalidades:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Cadastro e gestão de propriedades</li>
          <li>Calendário interativo com controle de tarifas</li>
          <li>Sistema completo de reservas</li>
          <li>Controle de pagamentos e status</li>
        </ul>
      </div>
    </div>
  );
}