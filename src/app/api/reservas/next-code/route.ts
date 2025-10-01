import { prisma } from "@/src/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const lastReservation = await prisma.reservation.findFirst({
      orderBy: { createdAt: "desc" },
      select: { code: true },
    });

    let nextCode = "00000001"; // começa no 10000000
    if (lastReservation?.code) {
      const lastNumber = parseInt(lastReservation.code) || 10000001;
      nextCode = String(lastNumber + 1).padStart(8, "0");
    }

    return NextResponse.json({ nextCode });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao gerar próximo código" }, { status: 500 });
  }
}
