
import { db } from "@/app/src/prisma";
import { sendPlanEmail } from "@/app/src/services/email";
import { groq } from "@/app/src/services/groq";
import { buildPrompt } from "@/app/src/services/prompt-builder";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const prompt = buildPrompt(body);

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        temperature: 0.3,
        messages: [
            {
                role: "system",
                content: `
Você é um especialista em alimentação saudável.

Sua função é analisar informações de usuários e gerar recomendações alimentares personalizadas.

Diretrizes:

- Seja conservador.
- Não forneça diagnósticos médicos.
- Não prescreva medicamentos.
- Não invente alergias ou restrições.
- Considere o objetivo informado.
- Considere atividades físicas.
- Considere peso e altura.

Retorne SOMENTE JSON válido.

Não utilize markdown.
Não utilize texto fora do JSON.

As recomendações devem ser práticas e realistas para pessoas comuns.
`,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    const content =
        response.choices[0].message.content ?? "{}";


    const planoObj = JSON.parse(content);

    const planoSalvo = await db.dietPlan.create({
        data: {
            nome: body.nome,
            email: body.email,

            idade: Number(body.idade),

            pesoAtual: Number(
                String(body.peso).replace(",", ".")
            ),

            altura: Number(
                String(body.altura).replace(",", ".")
            ),

            pesoMeta: Number(
                String(body.meta).replace(",", ".")
            ),

            objetivo:
                body.objetivo === "Emagrecer"
                    ? "WEIGHT_LOSS"
                    : body.objetivo === "Ganhar massa"
                        ? "MUSCLE_GAIN"
                        : "MAINTAIN",

            exercicios: body.exercicios,

            caloriasEstimadas:
                planoObj.resumo.calorias_estimadas,

            tempoEstimado:
                planoObj.resumo.tempo_estimado,

            plano: planoObj,

            emailEnviado: false,
        },
    });

    await sendPlanEmail({
        email: body.email,
        nome: body.nome,
        plano: content,
    });

    return NextResponse.json({
        success: true,
        raw: content,
    });
}