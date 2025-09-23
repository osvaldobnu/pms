import { NextResponse } from "next/server";
import { prisma } from "../../../_lib/prisma";

// Função auxiliar para identificar se a data é feriado/festa
function getSeasonRate(property: any, date: Date): number {
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();

    // 🎄 Natal (24 a 25 de dezembro)
    if (month === 12 && (day === 24 || day === 25)) return property.christmas;

    // 🎆 Ano Novo (31 de dezembro e 1 de janeiro)
    if ((month === 12 && day === 31) || (month === 1 && day === 1))
        return property.newYear;

    // 🎭 Carnaval (exemplo fixo: 10 a 13 de fevereiro - pode ajustar)
    if (month === 2 && day >= 10 && day <= 13) return property.carnival;

    // 📅 Feriados (simplificado → finais de semana considerados feriado)
    if (date.getDay() === 0 || date.getDay() === 6) return property.holidays;

    // 🌱 Baixa temporada (default)
    return property.lowSeason;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { propertyId, checkIn, checkOut, guestCount } = body;

        if (!propertyId || !checkIn || !checkOut) {
            return NextResponse.json(
                { error: "Dados insuficientes para calcular valor" },
                { status: 400 }
            );
        }

        const property = await prisma.property.findUnique({
            where: { id: propertyId },
        });

        if (!property) {
            return NextResponse.json(
                { error: "Propriedade não encontrada" },
                { status: 404 }
            );
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkOutDate <= checkInDate) {
            return NextResponse.json(
                { error: "Período inválido" },
                { status: 400 }
            );
        }

        let totalValue = 0;
        let currentDate = new Date(checkInDate);

        // Itera cada dia da estadia e aplica tarifa correta
        while (currentDate < checkOutDate) {
            totalValue += getSeasonRate(property, currentDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Aplica adicional por hóspedes
        if (guestCount && property.extraGuestFee) {
            totalValue += guestCount * property.extraGuestFee;
        }

        return NextResponse.json({ totalValue });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro ao calcular valor" },
            { status: 500 }
        );
    }
}
