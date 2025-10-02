import { NextResponse } from "next/server";
import { prisma } from "../../../_lib/prisma";

// Função auxiliar para identificar se a data é feriado/festa
function getSeasonRate(property: any, date: Date): number {
    const year = date.getFullYear();

    // Função auxiliar para comparar datas sem hora
    const isBetween = (start: string, end: string) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);

        const startDate = new Date(start);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(end);
        endDate.setHours(0, 0, 0, 0);

        return d.getTime() >= startDate.getTime() && d.getTime() <= endDate.getTime();
    };

    // 🎄 Natal
    if (
        (year === 2025 && isBetween("2025-12-22", "2025-12-26")) ||
        (year === 2026 && isBetween("2026-12-22", "2026-12-26")) ||
        (year === 2027 && isBetween("2027-12-22", "2027-12-27"))
    ) return property.christmas;

    // 🥳 Reveillon
    if (
        (year === 2025 && isBetween("2025-12-27", "2026-01-04")) ||
        (year === 2026 && isBetween("2026-12-27", "2027-01-04")) ||
        (year === 2027 && isBetween("2027-12-27", "2028-01-04"))
    ) return property.newYear;

    // 🎭 Carnaval
    if (
        (year === 2026 && isBetween("2026-02-13", "2026-02-22")) ||
        (year === 2027 && isBetween("2027-02-05", "2027-02-14")) ||
        (year === 2025 && isBetween("2025-11-01", "2025-11-03"))
    ) return property.carnival;

    // 📅 Feriados (outros)
    // 2025
    if (
        (year === 2025 && isBetween("2025-10-10", "2025-10-19")) ||
        (year === 2025 && isBetween("2025-11-14", "2025-11-16")) ||
        (year === 2025 && isBetween("2025-11-19", "2025-11-23"))
    ) return property.holidays;

    // Alta temporada
    if (
        (year === 2026 && isBetween("2026-01-05", "2026-01-31")) ||
        (year === 2027 && isBetween("2027-01-04", "2027-01-31")) ||
        (year === 2025 && isBetween("2025-10-10", "2025-10-19"))
    ) return property.highSeason;

    // 2026
    if (
        (year === 2026 && isBetween("2026-04-02", "2026-04-05")) ||
        (year === 2026 && isBetween("2026-04-18", "2026-04-22")) ||
        (year === 2026 && isBetween("2026-06-03", "2026-06-07")) ||
        (year === 2026 && isBetween("2026-07-07", "2026-07-24")) ||
        (year === 2026 && isBetween("2026-09-05", "2026-09-08")) ||
        (year === 2026 && isBetween("2026-10-10", "2026-10-18")) ||
        (year === 2026 && isBetween("2026-11-10", "2026-11-16")) ||
        (year === 2026 && isBetween("2026-11-19", "2026-11-22"))
    ) return property.holidays;

    // 2027
    if (
        (year === 2027 && isBetween("2027-03-25", "2027-03-28")) ||
        (year === 2027 && isBetween("2027-04-19", "2027-04-25")) ||
        (year === 2027 && isBetween("2027-05-26", "2027-05-30")) || // Corrigido
        (year === 2027 && isBetween("2027-07-07", "2027-07-24")) ||
        (year === 2027 && isBetween("2027-09-06", "2027-09-08")) ||
        (year === 2027 && isBetween("2027-10-09", "2027-10-17")) ||
        (year === 2027 && isBetween("2027-11-01", "2027-11-03")) ||
        (year === 2027 && isBetween("2027-11-13", "2027-11-16")) ||
        (year === 2027 && isBetween("2027-11-19", "2027-11-21"))
    ) return property.holidays;

    // 🌱 Baixa temporada
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
        checkInDate.setHours(0, 0, 0, 0);

        const checkOutDate = new Date(checkOut);
        checkOutDate.setHours(0, 0, 0, 0);

        let totalValue = 0;
        let currentDate = new Date(checkInDate);

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
