import Link from "next/link";

export function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="section-container">

        <div className="bg-gradient-to-r from-emerald-300 to-teal-300 rounded-[40px] p-16 text-center">

          <h2 className="text-5xl font-bold">
            Pronto para começar?
          </h2>

          <p className="mt-5 text-lg">
            Monte seu plano alimentar em menos de 2 minutos.
          </p>

          <Link
            href="/diagnostico"
            className="
    inline-block
    mt-8
    bg-white
    px-8
    py-4
    rounded-full
    font-semibold
    hover:scale-105
    transition-all
    duration-200
    shadow-lg
    shadow-emerald-200
  "
          >
            Criar Meu Plano
          </Link>

        </div>

      </div>
    </section>
  );
}