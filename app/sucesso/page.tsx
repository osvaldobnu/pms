"use client";
export default function SucessoPage() {
  return (
    <main className="min-h-screen bg-[#f7fffc] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-[40px] bg-white p-10 text-center shadow-xl">
        <div className="mb-6 text-7xl">🎉</div>

        <h1 className="text-4xl font-bold text-gray-900">
          Estamos preparando seu plano
        </h1>

        <p className="mt-5 text-lg text-gray-600">
          Recebemos suas informações com sucesso.
        </p>

        <p className="mt-3 text-gray-500">
          Seu plano alimentar personalizado foi gerado e será enviado
          para o e-mail informado assim que o processamento for concluído.
        </p>

        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="
            mt-8
            cursor-pointer
            rounded-full
            bg-emerald-400
            px-8
            py-4
            font-semibold
            text-white
            shadow-lg
            shadow-emerald-100
            transition-all
            duration-200
            hover:scale-105
            hover:bg-emerald-500
          "
        >
          Voltar ao início
        </button>
      </div>
    </main>
  );
}