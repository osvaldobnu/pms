import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendPlanEmailParams = {
  nome: string;
  email: string;
  plano: string;
};

function createSection(
  titulo: string,
  itens: string[]
) {
  return `
    <div
      style="
        background:#ffffff;
        border-radius:16px;
        padding:20px;
        margin-top:20px;
        border:1px solid #e5e7eb;
      "
    >
      <h2
        style="
          margin-top:0;
          color:#111827;
        "
      >
        ${titulo}
      </h2>

      <ul
        style="
          padding-left:20px;
          color:#4b5563;
          line-height:1.8;
        "
      >
        ${itens
          .map((item) => `<li>${item}</li>`)
          .join("")}
      </ul>
    </div>
  `;
}

export async function sendPlanEmail({
  nome,
  email,
  plano,
}: SendPlanEmailParams) {
  const planoObj = JSON.parse(plano);

  const html = `
    <div
      style="
        font-family: Arial, Helvetica, sans-serif;
        background:#f7fffc;
        padding:40px;
      "
    >
      <div
        style="
          max-width:800px;
          margin:0 auto;
        "
      >
        <div
          style="
            background:white;
            padding:30px;
            border-radius:20px;
            border:1px solid #d1fae5;
          "
        >
          <h1
            style="
              margin:0;
              color:#10b981;
            "
          >
            🥗 NutriAI
          </h1>

          <h2
            style="
              margin-top:25px;
              color:#111827;
            "
          >
            Olá, ${nome}!
          </h2>

          <p
            style="
              color:#4b5563;
              line-height:1.8;
            "
          >
            Seu plano alimentar personalizado foi gerado com sucesso.
          </p>

          <div
            style="
              background:#ecfdf5;
              padding:20px;
              border-radius:16px;
              margin-top:20px;
            "
          >
            <h2
              style="
                margin-top:0;
                color:#065f46;
              "
            >
              🎯 Resumo
            </h2>

            <p>
              <strong>Objetivo:</strong>
              ${planoObj.resumo.objetivo}
            </p>

            <p>
              <strong>Calorias estimadas:</strong>
              ${planoObj.resumo.calorias_estimadas} kcal
            </p>

            <p>
              <strong>Tempo estimado:</strong>
              ${planoObj.resumo.tempo_estimado}
            </p>
          </div>

          ${createSection(
            "☀️ Café da manhã",
            planoObj.cafe_da_manha || []
          )}

          ${createSection(
            "🍽️ Almoço",
            planoObj.almoco || []
          )}

          ${createSection(
            "🥜 Lanches",
            planoObj.lanches || []
          )}

          ${createSection(
            "🌙 Jantar",
            planoObj.jantar || []
          )}

          ${createSection(
            "💡 Orientações",
            planoObj.orientacoes || []
          )}

          ${createSection(
            "📌 Observações",
            planoObj.observacoes || []
          )}

          <div
            style="
              margin-top:30px;
              padding-top:20px;
              border-top:1px solid #e5e7eb;
              color:#6b7280;
              font-size:14px;
            "
          >
            Este conteúdo possui caráter informativo e não substitui
            acompanhamento médico ou nutricional profissional.
          </div>
        </div>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Seu plano alimentar está pronto 🥗",
    html,
  });

  if (error) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
}