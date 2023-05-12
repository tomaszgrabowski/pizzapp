import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  // Usuń istniejące dane (opcjonalne)
  await prisma.dish.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.order.deleteMany();
  await prisma.table.deleteMany();
  await prisma.company.deleteMany();

  // Dodaj syntetyczne dane
  for (let i = 0; i < 10; i++) {
    const company = await prisma.company.create({
      data: {
        name: faker.company.companyName(),
        address: faker.address.streetAddress(),
        phone: faker.phone.phoneNumber(),
      },
    });

    const table = await prisma.table.create({
      data: {
        name: `Table ${i + 1}`,
        companyId: company.id,
      },
    });

    const ingredients = [];
    for (let j = 0; j < 5; j++) {
      ingredients.push(
        await prisma.ingredient.create({
          data: {
            name: faker.random.word(),
            description: faker.lorem.sentence(),
            image: faker.image.imageUrl(),
            companyId: company.id,
          },
        })
      );
    }

    const dish = await prisma.dish.create({
      data: {
        name: faker.random.word(),
        description: faker.lorem.sentence(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.food(),
        companyId: company.id,
        ingredients: {
          connect: ingredients.map((ingredient) => ({ id: ingredient.id })),
        },
      },
    });

    await prisma.order.create({
      data: {
        address: faker.address.streetAddress(),
        phone: faker.phone.phoneNumber(),
        status: "In progress",
        total: dish.price,
        companyId: company.id,
        tableId: table.id,
        dishes: {
          connect: { id: dish.id },
        },
      },
    });
  }

  console.log("Seed complete!");
  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error("Error seeding data:", error);
  process.exit(1);
});
