import { NextResponse } from "next/server";
import { prisma } from "../../../_lib/prisma";

// Listar reservas
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("propertyId");

    const reservations = await prisma.reservation.findMany({
      where: {
        AND: [
          propertyId ? { propertyId } : {},
        ],
      },
      include: { property: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reservations ?? []);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }

}
