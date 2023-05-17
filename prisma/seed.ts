import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  // Usuń istniejące dane (opcjonalne)
  await prisma.dish.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.order.deleteMany();
  await prisma.table.deleteMany();

  // Dodaj syntetyczne dane
  for (let i = 0; i < 10; i++) {
    const table = await prisma.table.create({
      data: {
        name: `Table ${i + 1}`,
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
        ingredients: {
          connect: ingredients.map((ingredient) => ({ id: ingredient.id })),
        },
      },
    });

    await prisma.order.create({
      data: {
        status: "In progress",
        total: dish.price,
        tableId: table.id,
        DishOnOrder: {
          create: {
            dishId: dish.id,
            quantity: 1,
          },
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
