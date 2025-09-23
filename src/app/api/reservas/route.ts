import { NextResponse } from "next/server";
import { prisma } from "../../_lib/prisma";

// Listar reservas
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: { property: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reservations ?? []);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}

// Criar reserva
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const reservation = await prisma.reservation.create({
      data: {
        guestName: body.guestName,
        guestCount: body.guestCount ?? null, // NOVO
        contactPhone: body.contactPhone || null,
        origin: body.origin || null,
        guestCount: body.guestCount ?? null,

        checkIn: new Date(body.checkIn),
        checkOut: new Date(body.checkOut),
        totalValue: parseFloat(body.totalValue) || 0,
        notes: body.notes || null,

        paymentMethod: body.paymentMethod || null,
        paymentStatus: body.paymentStatus || null,
        secondInstallmentDate: body.secondInstallmentDate
          ? new Date(body.secondInstallmentDate)
          : null,
        thirdInstallmentDate: body.thirdInstallmentDate
          ? new Date(body.thirdInstallmentDate)
          : null,
        commissionTotal: body.commissionTotal ? parseFloat(body.commissionTotal) : null,
        commissionStatusJoao: body.commissionStatusJoao || null,
        commissionStatusMateus: body.commissionStatusMateus || null,

        property: { connect: { id: body.propertyId } },
      },
      include: { property: true },
    });
    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar reserva" }, { status: 500 });
  }
}

// Atualizar reserva
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const reservation = await prisma.reservation.update({
      where: { id: body.id },
      data: {
        guestName: body.guestName,
        guestCount: body.guestCount ?? null, // NOVO
        checkIn: body.checkIn ? new Date(body.checkIn) : undefined,
        checkOut: body.checkOut ? new Date(body.checkOut) : undefined,
        totalValue: body.totalValue !== undefined ? parseFloat(body.totalValue) : undefined,
        notes: body.notes ?? null,
        paymentMethod: body.paymentMethod ?? null,
        paymentStatus: body.paymentStatus ?? null,
        secondInstallmentDate: body.secondInstallmentDate
          ? new Date(body.secondInstallmentDate)
          : null,
        thirdInstallmentDate: body.thirdInstallmentDate
          ? new Date(body.thirdInstallmentDate)
          : null,
        commissionTotal: body.commissionTotal ? parseFloat(body.commissionTotal) : null,
        commissionStatusJoao: body.commissionStatusJoao ?? null,
        commissionStatusMateus: body.commissionStatusMateus ?? null,
        property: body.propertyId ? { connect: { id: body.propertyId } } : undefined,
      },
      include: { property: true },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao editar reserva" }, { status: 500 });
  }
}

// Cancelar reserva
export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();

    const reservation = await prisma.reservation.update({
      where: { id },
      data: { canceled: true },
      include: { property: true },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao cancelar reserva" }, { status: 500 });
  }
}
