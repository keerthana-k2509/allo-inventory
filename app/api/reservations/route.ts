import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const body = await request.json();

  const {
    productId,
    warehouseId,
    quantity
  } = body;

  const inventory =
    await prisma.inventory.findFirst({
      where: {
        productId,
        warehouseId
      }
    });

  if (!inventory) {
    return NextResponse.json(
      { error: "Inventory not found" },
      { status: 404 }
    );
  }

  const available =
    inventory.totalStock -
    inventory.reservedStock;

  if (available < quantity) {
    return NextResponse.json(
      { error: "Not enough stock" },
      { status: 409 }
    );
  }

  await prisma.inventory.update({
    where: {
      id: inventory.id
    },
    data: {
      reservedStock: {
        increment: quantity
      }
    }
  });

  const reservation =
    await prisma.reservation.create({
      data: {
        productId,
        warehouseId,
        quantity,
        expiresAt: new Date(
          Date.now() + 10 * 60 * 1000
        )
      }
    });

  return NextResponse.json(reservation);
}