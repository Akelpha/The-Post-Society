import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();
const roundsOfHashing = 10;
async function main() {
  const passwordalice = await bcrypt.hash("password-alice", roundsOfHashing);
  const passwordbob = await bcrypt.hash("password-bob", roundsOfHashing);
  // Your example code
  const alice = await prisma.user.upsert({
    data: {
      name: "Alice",
      where: { email: "alice@prisma.io" },
      update: {
        password: passwordalice,
      },
      create: {
        email: "alice@prisma.io",
        name: "Alice Adams",
        password: passwordalice,
      },
      posts: {
        create: {
          title: "Join us for Prisma Day 2020",
          content: "It's pretty good to use prisma these days like a ORM.",
        },
      },
    },
  });

  // Add more seed data as needed
  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      where: { email: "bob@prisma.io" },
      update: {
        password: passwordbob,
      },
      create: {
        email: "bob@prisma.io",
        name: "Bob Ruheni",
        password: passwordbob,
      },
      posts: {
        create: [
          { title: "Follow Prisma on Twitter" },
          { content: "It will allow you to know everything about us." },
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
