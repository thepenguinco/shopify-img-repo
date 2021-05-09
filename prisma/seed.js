const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const admins = [{ name: "Admin", email: "testadmin@gmail.com" }];
  const users = [{ name: "User", email: "testuser@gmail.com" }];

  const adminUpserts = [];
  for (const admin of admins) {
    const adminUpsert = await prisma.users.upsert({
      where: { email: admin.email },
      update: {
        role: "ADMIN",
        name: admin.name,
      },
      create: {
        role: "ADMIN",
        email: admin.email,
        name: admin.name,
      },
    });
    adminUpserts.push(adminUpsert);
    console.log({ adminUpsert });
  }

  const userUpserts = [];
  for (const user of users) {
    const userUpsert = await prisma.users.upsert({
      where: { email: user.email },
      update: {
        role: "USER",
        name: user.name,
      },
      create: {
        role: "USER",
        email: user.email,
        name: user.name,
      },
    });
    userUpserts.push(userUpsert);
    console.log({ userUpsert });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
