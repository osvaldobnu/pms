export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="py-24 px-6"
    >
      <div className="section-container">

        <h2 className="text-center text-4xl font-bold">
          Como funciona
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-16">

          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-400 text-white flex items-center justify-center text-xl font-bold">
              1
            </div>

            <h3 className="font-bold mt-5">
              Compartilhe suas metas e hábitos
            </h3>

            <p className="text-gray-500 mt-2">
              Informe seu peso, idade, rotina e atividades físicas para que possamos entender seu perfil.
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-400 text-white flex items-center justify-center text-xl font-bold">
              2
            </div>

            <h3 className="font-bold mt-5">
              Nossa IA cria sua estratégia
            </h3>

            <p className="text-gray-500 mt-2">
              A inteligência artificial avalia suas informações e monta recomendações alinhadas aos seus objetivos.
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-400 text-white flex items-center justify-center text-xl font-bold">
              3
            </div>

            <h3 className="font-bold mt-5">
              Receba seu plano personalizado
            </h3>

            <p className="text-gray-500 mt-2">
              Comece com mais clareza e confiança
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}