import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const products = await prisma.inventory.findMany({
    include: {
      product: true,
      warehouse: true
    }
  });

  const result = products.map(item => ({
    productId: item.product.id,
    warehouseId: item.warehouse.id,
    name: item.product.name,
    warehouse: item.warehouse.name,
    availableStock:
      item.totalStock - item.reservedStock
  }));

  return NextResponse.json(result);
}