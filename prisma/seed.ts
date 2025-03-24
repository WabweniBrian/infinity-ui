const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seedRolesAndUsers() {
  const hashedPassword = await bcrypt.hash("superadmin", 10);

  await prisma.$transaction(async (transaction: any) => {
    const existingAdmin = await transaction.user.findFirst({
      where: { role: "Admin" },
    });
    if (!existingAdmin) {
      await transaction.user.create({
        data: {
          name: "Super Admin",
          email: "superadmin@example.com",
          password: hashedPassword,
          role: "Admin",
        },
      });
      console.log(
        "🟢 Super admin user created or updated with email: superadmin@example.com",
      );
    } else {
      console.log("⚪ Super admin user already exists.");
    }
  });
}

async function main() {
  try {
    await prisma.$transaction(async () => {
      await seedRolesAndUsers();
    });
    console.log("✅ All seeding completed successfully.");
  } catch (error: any) {
    console.error(`🔴 Transaction failed: ${error.message}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
