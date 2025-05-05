import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Your example code
  const alice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: { title: "Join us for Prisma Day 2020" },
      },
    },
  });

  // Add more seed data as needed
  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@prisma.io",
      posts: {
        create: [
          { title: "Follow Prisma on Twitter" },
          { title: "Prisma on YouTube" },
        ],
      },
    },
  });

  console.log({ alice, bob });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
