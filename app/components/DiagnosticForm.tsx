"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function DiagnosticForm() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const gerarPlano = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/plano", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error("Erro ao gerar plano");
      }

      router.push("/sucesso");

    } catch (error) {
      console.error(error);

      alert(
        "Não foi possível gerar seu plano. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const [form, setForm] = useState({
    nome: "",
    email: "",
    idade: "",
    peso: "",
    altura: "",
    meta: "",
    objetivo: "Emagrecer",
    exercicios: "",
  });

  const next = () => {
    if (!validateStep()) {

      alert(JSON.stringify(form, null, 2));

      setError("Preencha todos os campos para continuar.");
      return;
    }

    setError("");
    setStep((s) => s + 1);
  };

  const back = () => {
    setError("");
    setStep((s) => s - 1);
  };

  const validateStep = () => {
    if (step === 1) {
      return (
        form.nome.trim() !== "" &&
        form.email.trim() !== "" &&
        form.idade.trim() !== ""
      );
    }

    if (step === 2) {
      return (
        form.peso.trim() !== "" &&
        form.altura.trim() !== "" &&
        form.meta.trim() !== ""
      );
    }

    if (step === 3) {
      return form.exercicios.trim() !== "";
    }

    return true;
  };

  return (
    <div className="w-full max-w-xl">
      <div className="mb-10">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-emerald-400 rounded-full transition-all"
            style={{
              width: `${(step / 4) * 100}%`,
            }}
          />
        </div>
      </div>

      <div
        key={step}
        className="
          bg-white
          rounded-[40px]
          p-10
          shadow-xl
        "
      >
        {step === 1 && (
          <>
            <h2 className="text-3xl font-bold">
              Vamos começar
            </h2>

            <p className="text-gray-500 mt-2">
              Conte um pouco sobre você.
            </p>

            <input
              placeholder="Nome"
              type="text"
              className="w-full mt-6 p-4 rounded-xl border"
              value={form.nome}
              onChange={(e) =>
                setForm({
                  ...form,
                  nome: e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              type="email"
              className="w-full mt-4 p-4 rounded-xl border"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              placeholder="Idade"
              type="number"
              className="w-full mt-4 p-4 rounded-xl border"
              value={form.idade}
              onChange={(e) =>
                setForm({
                  ...form,
                  idade: e.target.value,
                })
              }
            />

            {
              error && (
                <p className="mt-4 text-sm text-red-500">
                  {error}
                </p>
              )
            }

            <button
              style={{
                background: "red",
                width: "100%",
                height: "80px",
                position: "relative",
                zIndex: 99999,
              }}
              onClick={() => alert("clicou")}
            >
              TESTE
            </button>

            <button
              onClick={() => { alert("oi"); next() }}
              onTouchStart={next}
              className="
                mt-6
                w-full
                bg-emerald-400
                text-white
                p-4
                rounded-xl
                cursor-pointer
              "
            >
              Continuar
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-3xl font-bold">
              Seu objetivo físico
            </h2>

            <input
              placeholder="Peso Atual"
              type="number"
              className="w-full mt-6 p-4 rounded-xl border"
              value={form.peso}
              onChange={(e) =>
                setForm({
                  ...form,
                  peso: e.target.value,
                })
              }
            />

            <input
              placeholder="Altura"
              type="number"
              className="w-full mt-4 p-4 rounded-xl border"
              value={form.altura}
              onChange={(e) =>
                setForm({
                  ...form,
                  altura: e.target.value,
                })
              }
            />

            <input
              placeholder="Meta de Peso"
              type="number"
              className="w-full mt-4 p-4 rounded-xl border"
              value={form.meta}
              onChange={(e) =>
                setForm({
                  ...form,
                  meta: e.target.value,
                })
              }
            />

            {
              error && (
                <p className="mt-4 text-sm text-red-500">
                  {error}
                </p>
              )
            }
            <div className="flex gap-4 mt-6">
              <button
                onClick={back}
                className="cursor-pointer flex-1 border rounded-xl p-4"
              >
                Voltar
              </button>

              <button
                onClick={next}
                onTouchStart={next}
                className="
                  cursor-pointer 
                  flex-1
                  bg-emerald-400
                  text-white
                  rounded-xl
                  p-4
                "
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-3xl font-bold">
              Seus hábitos
            </h2>

            <select
              className="w-full mt-6 p-4 rounded-xl border"
              value={form.objetivo}
              onChange={(e) =>
                setForm({
                  ...form,
                  objetivo: e.target.value,
                })
              }
            >
              <option value="Emagrecer">Emagrecer</option>
              <option value="Ganhar massa">Ganhar massa</option>
              <option value="Manter peso">Manter peso</option>
            </select>

            <textarea
              placeholder="Quais atividades físicas você pratica? Se sim, quantas vezes a semana?"
              className="w-full mt-4 p-4 rounded-xl border"
              rows={4}
              value={form.exercicios}
              onChange={(e) =>
                setForm({
                  ...form,
                  exercicios: e.target.value,
                })
              }
            />

            {
              error && (
                <p className="mt-4 text-sm text-red-500">
                  {error}
                </p>
              )
            }

            <div className="flex gap-4 mt-6">
              <button
                onClick={back}
                className="cursor-pointer flex-1 border rounded-xl p-4"
              >
                Voltar
              </button>

              <button
                onClick={next}
                onTouchStart={next}
                className="
                  cursor-pointer
                  flex-1
                  bg-emerald-400
                  text-white
                  rounded-xl
                  p-4
                "
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-3xl font-bold">
              Tudo pronto 🎉
            </h2>

            <p className="mt-4 text-gray-600">
              Seu perfil está pronto. Vamos criar recomendações alinhadas aos seus objetivos.
            </p>

            <button
              onClick={gerarPlano}
              disabled={loading}
              className="
    cursor-pointer
    mt-8
    w-full
    bg-emerald-500
    text-white
    p-4
    rounded-xl
    hover:bg-emerald-600
    transition
    disabled:opacity-50
  "
            >
              {loading ? "Gerando..." : "Gerar Meu Plano"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}