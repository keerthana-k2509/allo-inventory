import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params;

  const reservation =
    await prisma.reservation.findUnique({
      where: { id }
    });

  if (!reservation) {
    return NextResponse.json(
      { error: "Reservation not found" },
      { status: 404 }
    );
  }

  await prisma.inventory.updateMany({
    where: {
      productId: reservation.productId,
      warehouseId: reservation.warehouseId
    },
    data: {
      reservedStock: {
        decrement: reservation.quantity
      }
    }
  });

  await prisma.reservation.update({
    where: { id },
    data: {
      status: "released"
    }
  });

  return NextResponse.json({
    message: "Reservation released"
  });
}