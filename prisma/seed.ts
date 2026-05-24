import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const product1 = await prisma.product.create({
    data: {
      name: "MacBook"
    }
  });

  const product2 = await prisma.product.create({
    data: {
      name: "AirPods"
    }
  });

  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: "Chennai"
    }
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: "Bangalore"
    }
  });

  await prisma.inventory.createMany({
    data: [
      {
        productId: product1.id,
        warehouseId: warehouse1.id,
        totalStock: 5
      },
      {
        productId: product2.id,
        warehouseId: warehouse2.id,
        totalStock: 3
      }
    ]
  });

  console.log("Seed complete");
}

main()
.catch(console.error)
.finally(async()=>{
 await prisma.$disconnect()
})