export function Footer() {
  return (
    <footer className="border-t border-emerald-100 py-8">
        <div className="mt-8 border-t border-emerald-50">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} NutriAI. Todos os direitos reservados.
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-center text-xs text-gray-400">
            As recomendações fornecidas possuem caráter informativo e não
            substituem orientação médica, nutricional ou acompanhamento
            profissional especializado.
          </p>
      </div>
    </footer>
  );
}