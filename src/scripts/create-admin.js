import { hash } from "bcryptjs";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a new admin user
  const email = "admin@bioscience.undana.ac.id";
  const hashedPassword = await hash("YourSecurePassword123", 10);
  
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      role: "ADMIN",
    },
    create: {
      email,
      name: "Admin Bioscience",
      password: hashedPassword,
      role: "ADMIN",
      userId: `local_${Date.now()}`,
    },
  });
  
  console.log(`Admin user created/updated: ${user.email}`);
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