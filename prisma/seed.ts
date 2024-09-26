const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await bcrypt.hash("superadmin", 10);
  await prisma.user.create({
    data: {
      email: "superadmin@example.com",
      name: "Super Admin",
      password: hashedPassword,
      role: "Admin",
    },
  });
  console.log("🟢 Super admin user created with email: superadmin@example.com");
}

main()
  .catch((e) => {
    console.error(`🔴 Error: ${e.message}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
