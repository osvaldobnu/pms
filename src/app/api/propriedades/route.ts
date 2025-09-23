import { NextResponse } from "next/server";
import { prisma } from "../../_lib/prisma";

// Criar uma nova propriedade
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const property = await prisma.property.create({
      data: {
        name: body.name,
        title: body.title,
        description: body.description || null,
        phone: body.phone || null,
        ranking: body.ranking ? Number(body.ranking) : null,
        location: body.location || null,
        locationNotes: body.locationNotes || null,
        beach: body.beach || null,
        guests: Number(body.guests),
        bedrooms: Number(body.bedrooms),
        beds: Number(body.beds),
        amenities: body.amenities || null,
        extraGuestFee: body.extraGuestFee ? parseFloat(body.extraGuestFee) : null,

        crib: body.crib ? Number(body.crib) : null,
        childBed: body.childBed ? Number(body.childBed) : null,
        doubleBed: body.doubleBed ? Number(body.doubleBed) : null,
        foldingBed: body.foldingBed ? Number(body.foldingBed) : null,
        kingBed: body.kingBed ? Number(body.kingBed) : null,
        mezzanineBed: body.mezzanineBed ? Number(body.mezzanineBed) : null,
        queenBed: body.queenBed ? Number(body.queenBed) : null,
        sofaBed: body.sofaBed ? Number(body.sofaBed) : null,
        singleBed: body.singleBed ? Number(body.singleBed) : null,

        lowSeason: parseFloat(body.lowSeason),
        holidays: parseFloat(body.holidays),
        christmas: parseFloat(body.christmas),
        newYear: parseFloat(body.newYear),
        carnival: parseFloat(body.carnival),
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar propriedade" }, { status: 500 });
  }
}

// Listar propriedades
export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(properties);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao listar propriedades" }, { status: 500 });
  }
}

// Atualizar (editar)
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const property = await prisma.property.update({
      where: { id: body.id },
      data: {
        name: body.name,
        title: body.title,
        description: body.description || null,
        phone: body.phone || null,
        ranking: body.ranking ? Number(body.ranking) : null,
        location: body.location || null,
        locationNotes: body.locationNotes || null,
        beach: body.beach || null,
        guests: Number(body.guests),
        bedrooms: Number(body.bedrooms),
        beds: Number(body.beds),
        amenities: body.amenities || null,
        extraGuestFee: body.extraGuestFee ? parseFloat(body.extraGuestFee) : null,

        crib: body.crib ? Number(body.crib) : null,
        childBed: body.childBed ? Number(body.childBed) : null,
        doubleBed: body.doubleBed ? Number(body.doubleBed) : null,
        foldingBed: body.foldingBed ? Number(body.foldingBed) : null,
        kingBed: body.kingBed ? Number(body.kingBed) : null,
        mezzanineBed: body.mezzanineBed ? Number(body.mezzanineBed) : null,
        queenBed: body.queenBed ? Number(body.queenBed) : null,
        sofaBed: body.sofaBed ? Number(body.sofaBed) : null,
        singleBed: body.singleBed ? Number(body.singleBed) : null,

        lowSeason: parseFloat(body.lowSeason),
        holidays: parseFloat(body.holidays),
        christmas: parseFloat(body.christmas),
        newYear: parseFloat(body.newYear),
        carnival: parseFloat(body.carnival),
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao editar propriedade" }, { status: 500 });
  }
}

// Alternar status (ativar/inativar)
export async function PATCH(req: Request) {
  try {
    const { id, active } = await req.json();

    const property = await prisma.property.update({
      where: { id },
      data: { active },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao atualizar status" }, { status: 500 });
  }
}
