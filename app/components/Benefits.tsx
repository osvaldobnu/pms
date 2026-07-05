import {
  Sparkles,
  Target,
  Salad
} from "lucide-react";

export function Benefits() {
  return (
    <section
      id="beneficios"
      className="py-24 px-6"
    >
      <div className="section-container">

        <h2 className="text-center text-4xl font-bold">
          Tudo personalizado para você
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <Sparkles
              className="text-emerald-500 mb-4"
              size={32}
            />
            <h3 className="font-bold text-xl">
              Resultado em minutos
            </h3>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Informe seus objetivos, peso e rotina para receber
              sugestões alimentares personalizadas em poucos minutos.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <Target
              className="text-emerald-500 mb-4"
              size={32}
            />
            <h3 className="font-bold text-xl">
              Feito para sua meta
            </h3>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Seu plano é criado com base no seu objetivo,
              peso atual e ritmo de evolução desejado.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <Salad
              className="text-emerald-500 mb-4"
              size={32}
            />
            <h3 className="font-bold text-xl">
              Alimentação inteligente
            </h3>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Sugestões alinhadas à sua rotina, preferências
              alimentares e atividades físicas favoritas.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}