const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
async function main() {
  // Check if admin user already exists
  const existingAdmin = await prisma.user.findFirst({
    where: {
      role: "Admin",
    },
  });

  // Only create admin if none exists
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("superadmin", 10);
    await prisma.user.create({
      data: {
        email: "superadmin@example.com",
        name: "Super Admin",
        password: hashedPassword,
        role: "Admin",
      },
    });
    console.log(
      "🟢 Super admin user created with email: superadmin@example.com",
    );
  } else {
    console.log("🟡  Admin user already exists, skipping creation");
  }
}

main()
  .catch((e) => {
    console.error(`🔴 Error: ${e.message}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
