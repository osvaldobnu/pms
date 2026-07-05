export function buildPlanEmail(
    nome: string,
    plano: any
) {
    return `
  <div
    style="
      font-family: Arial, Helvetica, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
      background: #f7fffc;
    "
  >

    <h1 style="color:#10b981;">
      🥗 Olá, ${nome}!
    </h1>

    <p>
      Seu plano alimentar personalizado foi gerado com sucesso.
    </p>

    <div
      style="
        background:white;
        padding:20px;
        border-radius:16px;
        margin-top:20px;
      "
    >
      <h2>🎯 Resumo</h2>

      <p>
        <strong>Objetivo:</strong>
        ${plano.resumo.objetivo}
      </p>

      <p>
        <strong>Calorias estimadas:</strong>
        ${plano.resumo.calorias_estimadas} kcal
      </p>

      <p>
        <strong>Tempo estimado:</strong>
        ${plano.resumo.tempo_estimado}
      </p>
    </div>

    ${buildSection(
        "☀️ Café da Manhã",
        plano.cafe_da_manha
    )}

    ${buildSection(
        "🍽️ Almoço",
        plano.almoco
    )}

    ${buildSection(
        "🥜 Lanches",
        plano.lanches
    )}

    ${buildSection(
        "🌙 Jantar",
        plano.jantar
    )}

    ${buildSection(
        "💡 Orientações",
        plano.orientacoes
    )}

    ${buildSection(
        "📌 Observações",
        plano.observacoes
    )}

    <div
      style="
        margin-top:32px;
        color:#666;
        font-size:14px;
      "
    >
      Este conteúdo possui caráter informativo e não substitui
      acompanhamento profissional.
    </div>

  </div>
  `;
}

function buildSection(
    title: string,
    items: string[]
) {
    return `
    <div
      style="
        background:white;
        padding:20px;
        border-radius:16px;
        margin-top:20px;
      "
    >
      <h2>${title}</h2>

      <ul>
        ${items
            .map(
                (item) =>
                    `<li style="margin-bottom:8px;">${item}</li>`
            )
            .join("")}
      </ul>
    </div>
  `;
}