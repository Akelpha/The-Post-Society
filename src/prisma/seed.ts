// This file is used to seed your database with initial data.
import { PrismaClient } from '@prisma/client'
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();
const roundsOfHashing = 10;
async function main() {
  const passwordalice = await bcrypt.hash("password-alice", roundsOfHashing);
  const passwordbob = await bcrypt.hash("password-bob", roundsOfHashing);
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {
      password: passwordalice,
    },
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      password: passwordalice,
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {
      password: passwordbob,
    },
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      password: passwordbob,
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })