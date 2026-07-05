import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full py-6">
      <div className="section-container flex items-center justify-between px-6">
        <div className="text-2xl font-bold text-emerald-500">
          NutriAI
        </div>

        <Link href="/diagnostico" className="cursor-pointer rounded-full bg-emerald-400 px-6 py-3 text-white font-medium hover:bg-emerald-500 transition">
          Criar Plano Grátis
        </Link>
      </div>
    </header>
  );
}