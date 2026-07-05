export function buildPrompt(data: {
  nome: string;
  idade: string;
  peso: string;
  altura: string;
  meta: string;
  objetivo: string;
  exercicios: string;
}) {
  return `
Analise os dados abaixo.

Nome: ${data.nome}
Idade: ${data.idade}
Peso atual: ${data.peso}
Altura: ${data.altura}
Meta de peso: ${data.meta}
Objetivo: ${data.objetivo}
Atividades físicas: ${data.exercicios}

Crie recomendações alimentares personalizadas.

IMPORTANTE:

Retorne APENAS JSON válido.

Estrutura:

{
  "resumo": {
    "objetivo": "",
    "calorias_estimadas": 0,
    "tempo_estimado": ""
  },
  "cafe_da_manha": [],
  "almoco": [],
  "jantar": [],
  "lanches": [],
  "orientacoes": [],
  "observacoes": []
}

Não utilize markdown.
Não utilize explicações fora do JSON.
`;
}